import CodeBlock from '../components/ui/CodeBlock'
import NestCard from '../components/ui/NestCard'

function NxIntro() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🌐 ¿Qué es Nginx?</h2>
      <p className="text-sm text-nest-gray">Nginx es un servidor web y reverse proxy ultra rápido. El más usado del mundo.</p>
      <div className="grid lg:grid-cols-2 gap-4">
        <NestCard title="¿Para qué se usa?" icon="🌐" variant="green">
          <ul className="space-y-1.5 text-xs">
            <li>✅ <strong>Servir archivos estáticos</strong> — HTML, CSS, JS, imágenes</li>
            <li>✅ <strong>Reverse proxy</strong> — Redirigir a Node.js, Python, etc</li>
            <li>✅ <strong>Load balancer</strong> — Distribuir tráfico entre servidores</li>
            <li>✅ <strong>SSL/HTTPS</strong> — Terminar SSL antes de tu app</li>
            <li>✅ <strong>Caché</strong> — Acelerar respuestas</li>
            <li>✅ <strong>Compresión</strong> — gzip/brotli automático</li>
          </ul>
        </NestCard>
        <CodeBlock title="Instalar Nginx" language="bash" code={`# Ubuntu/Debian
sudo apt update
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verificar
sudo nginx -t          # test configuración
sudo systemctl status nginx
curl http://localhost   # ver página default

# Archivos importantes
/etc/nginx/nginx.conf           # config principal
/etc/nginx/sites-available/     # configs de sitios
/etc/nginx/sites-enabled/       # links activos
/var/log/nginx/access.log       # log de acceso
/var/log/nginx/error.log        # log de errores`} />
      </div>
    </div>
  )
}

function NxConfig() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">⚙️ Configuración</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Sitio estático" language="bash" code={`# /etc/nginx/sites-available/mi-sitio
server {
    listen 80;
    server_name tusitio.com www.tusitio.com;
    root /var/www/mi-sitio/dist;
    index index.html;

    # SPA: redirigir todo a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache de archivos estáticos
    location ~* \.(js|css|png|jpg|svg|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Compresión gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}

# Activar sitio
sudo ln -s /etc/nginx/sites-available/mi-sitio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx`} />
        <NestCard title="Comandos Nginx" icon="📋" variant="cyan">
          <ul className="space-y-1 text-xs font-code">
            <li><span className="text-nginx-green">nginx -t</span> — verificar config</li>
            <li><span className="text-nginx-green">systemctl reload nginx</span> — recargar</li>
            <li><span className="text-nginx-green">systemctl restart nginx</span> — reiniciar</li>
            <li><span className="text-nginx-green">systemctl status nginx</span> — estado</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

function NxProxy() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🔄 Reverse Proxy</h2>
      <CodeBlock title="Proxy a Node.js" language="bash" code={`server {
    listen 80;
    server_name api.tusitio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend en tusitio.com → archivos estáticos
# API en api.tusitio.com → Node.js en puerto 3000`} />
    </div>
  )
}

function NxSsl() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🔒 SSL con Certbot</h2>
      <CodeBlock title="HTTPS gratis con Let's Encrypt" language="bash" code={`# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obtener certificado (automático!)
sudo certbot --nginx -d tusitio.com -d www.tusitio.com
# Certbot modifica tu config de Nginx automáticamente
# Agrega redirect HTTP → HTTPS

# Renovar (automático con cron, pero puedes manual)
sudo certbot renew --dry-run

# Verificar auto-renovación
sudo systemctl status certbot.timer

# Resultado: tu sitio con https://tusitio.com
# Certificado se renueva automáticamente cada 90 días`} />
    </div>
  )
}

export const nginxTopics = {
  'nx-intro': NxIntro, 'nx-config': NxConfig,
  'nx-proxy': NxProxy, 'nx-ssl': NxSsl,
}
