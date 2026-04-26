import CodeBlock from '../components/ui/CodeBlock'
import NestCard from '../components/ui/NestCard'

function LxIntro() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🐧 Linux Esencial para Deploy</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Comandos esenciales" language="bash" code={`# Conectar al servidor
ssh usuario@ip-del-servidor
ssh -i mi-llave.pem ubuntu@12.34.56.78

# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar paquetes comunes
sudo apt install -y git curl wget unzip nginx

# Instalar Node.js (via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Procesos
ps aux | grep node     # buscar procesos
kill -9 PID            # matar proceso
htop                   # monitor interactivo

# Disco
df -h                  # espacio en disco
du -sh carpeta/        # tamaño carpeta

# Firewall
sudo ufw allow 80      # HTTP
sudo ufw allow 443     # HTTPS
sudo ufw allow 22      # SSH
sudo ufw enable`} />
        <NestCard title="¿Qué necesitas saber?" icon="📋" variant="yellow">
          <ul className="space-y-1.5 text-xs">
            <li>✅ SSH — conectarte al servidor</li>
            <li>✅ apt — instalar software</li>
            <li>✅ systemctl — gestionar servicios</li>
            <li>✅ ufw — firewall</li>
            <li>✅ nano/vim — editar archivos</li>
            <li>✅ pm2 — proceso manager para Node.js</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

function LxServer() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🖥️ Server Setup</h2>
      <CodeBlock title="Setup completo de servidor" language="bash" code={`# 1. Conectar
ssh root@12.34.56.78

# 2. Crear usuario (no usar root)
adduser deploy
usermod -aG sudo deploy
su - deploy

# 3. SSH key para el nuevo usuario
mkdir ~/.ssh
# Copiar tu llave pública a ~/.ssh/authorized_keys

# 4. Instalar todo
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl nginx

# 5. Instalar Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20

# 6. Instalar PM2 (process manager)
npm install -g pm2

# 7. Clonar tu proyecto
git clone https://github.com/tu-user/tu-repo.git
cd tu-repo
npm install
npm run build

# 8. Iniciar con PM2
pm2 start server.js --name mi-api
pm2 save
pm2 startup   # auto-start al reiniciar servidor

# 9. Configurar Nginx (ver sección Nginx)
# 10. Configurar SSL (ver sección SSL)`} />
    </div>
  )
}

function LxSecurity() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🛡️ Seguridad del Servidor</h2>
      <div className="grid lg:grid-cols-2 gap-4">
        <CodeBlock title="Hardening básico" language="bash" code={`# 1. Desactivar login con password (solo SSH key)
sudo nano /etc/ssh/sshd_config
# PasswordAuthentication no
# PermitRootLogin no
sudo systemctl restart sshd

# 2. Firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable

# 3. Fail2ban (bloquear intentos de login)
sudo apt install fail2ban
sudo systemctl enable fail2ban

# 4. Actualizaciones automáticas
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades`} />
        <NestCard title="Checklist seguridad" icon="🛡️" variant="red">
          <ul className="space-y-1.5 text-xs">
            <li>✅ SSH key only (no passwords)</li>
            <li>✅ No root login</li>
            <li>✅ Firewall activo (ufw)</li>
            <li>✅ Fail2ban instalado</li>
            <li>✅ Updates automáticos</li>
            <li>✅ SSL/HTTPS en todo</li>
            <li>✅ Backups regulares</li>
            <li>✅ Variables sensibles en .env</li>
          </ul>
        </NestCard>
      </div>
    </div>
  )
}

function LxFull() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold gradient-text-nest">🏆 Deploy Completo: VPS desde Cero</h2>
      <NestCard title="Checklist final" icon="📋" variant="green">
        <ol className="space-y-2 text-xs list-decimal pl-4">
          <li><strong>Comprar VPS</strong> — DigitalOcean/Linode ($4-6/mes)</li>
          <li><strong>Comprar dominio</strong> — Namecheap/Cloudflare ($10/año)</li>
          <li><strong>Conectar SSH</strong> — ssh usuario@ip</li>
          <li><strong>Instalar</strong> — Node.js, Nginx, PM2, Git</li>
          <li><strong>Clonar repo</strong> — git clone + npm install + npm run build</li>
          <li><strong>PM2</strong> — pm2 start server.js → mantiene tu app viva</li>
          <li><strong>Nginx</strong> — Reverse proxy + servir frontend</li>
          <li><strong>DNS</strong> — Apuntar dominio a IP del VPS</li>
          <li><strong>SSL</strong> — certbot --nginx -d tusitio.com</li>
          <li><strong>Seguridad</strong> — Firewall, SSH keys, fail2ban</li>
          <li><strong>CI/CD</strong> — GitHub Actions → deploy automático</li>
          <li><strong>Monitoreo</strong> — UptimeRobot + Sentry</li>
        </ol>
      </NestCard>
      <NestCard title="🚀 ¡Deploy completado!" icon="🎉" variant="red">
        <ul className="space-y-1 text-xs">
          <li><span className="text-deploy-green">✓</span> Deploy — plataformas, frontend, backend</li>
          <li><span className="text-deploy-green">✓</span> CI/CD — GitHub Actions, pipelines</li>
          <li><span className="text-deploy-green">✓</span> Nginx — proxy, SSL, configuración</li>
          <li><span className="text-deploy-green">✓</span> Linux — servidor, seguridad, PM2</li>
        </ul>
      </NestCard>
    </div>
  )
}

export const linuxTopics = {
  'lx-intro': LxIntro, 'lx-server': LxServer,
  'lx-security': LxSecurity, 'lx-full': LxFull,
}
