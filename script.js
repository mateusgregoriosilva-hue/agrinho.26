/**
 * ==========================================================================
 * AGRINHO 2026 - ADVANCED CREATIVE ENGINE (INTERACTIVE CYBER-ORGANIC MODULE)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Configurações Gerais Globais
    const STATE = {
        mouse: { x: 0, y: 0, targetX: 0, targetY: 0, ease: 0.08 },
        scroll: { current: 0, target: 0, ease: 0.1 }
    };

    /* ==========================================================================
       1. CORE CANVAS: ENXAME DE DRONES BIO-CONECTADOS (HIGH FIDELITY)
       ========================================================================== */
    const canvas = document.getElementById('droneGridCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d', { alpha: false }); // Otimização de renderização (desativa canal alpha global)
        let nodes = [];
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initEnxame();
        };

        class DroneNode {
            constructor() {
                this.reset();
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.baseX = Math.random() * canvas.width;
                this.baseY = Math.random() * canvas.height;
                this.x = this.baseX;
                this.y = this.baseY;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.8 + 0.8;
                this.orbitRadius = Math.random() * 15 + 5;
                this.angle = Math.random() * Math.PI * 2;
                this.angularSpeed = (Math.random() - 0.5) * 0.02;
            }

            update() {
                // Movimento cinemático composto (Física linear + Órbita flutuante)
                this.baseX += this.vx;
                this.baseY += this.vy;
                this.angle += this.angularSpeed;

                // Margem de segurança para rebote nas bordas da tela
                if (this.baseX < -20 || this.baseX > canvas.width + 20) this.vx *= -1;
                if (this.baseY < -20 || this.baseY > canvas.height + 20) this.vy *= -1;

                // Reação elástica ao movimento tridimensional do mouse (Efeito Parallax Orgânico)
                const mouseOffsetX = (STATE.mouse.x - canvas.width / 2) * (this.radius * 0.03);
                const mouseOffsetY = (STATE.mouse.y - canvas.height / 2) * (this.radius * 0.03);

                this.x = this.baseX + Math.cos(this.angle) * this.orbitRadius + mouseOffsetX;
                this.y = this.baseY + Math.sin(this.angle) * this.orbitRadius + mouseOffsetY;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 102, 0.45)';
                ctx.fill();
            }
        }

        const initEnxame = () => {
            nodes = [];
            // Densidade matemática adaptiva baseada na resolução horizontal da tela
            const density = Math.min(Math.floor(window.innerWidth / 15), 120);
            for (let i = 0; i < density; i++) {
                nodes.push(new DroneNode());
            }
        };

        const renderEnxame = () => {
            // Desenha um fundo sólido escuro para evitar sobreposição fantasma sem usar clearRect lento
            ctx.fillStyle = '#030d06';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Interpolação suave da posição física do mouse
            STATE.mouse.x += (STATE.mouse.targetX - STATE.mouse.x) * STATE.mouse.ease;
            STATE.mouse.y += (STATE.mouse.targetY - STATE.mouse.y) * STATE.mouse.ease;

            // Atualiza e renderiza os nós estruturais dos drones
            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            // Motor de Proximidade Matricial (Desenho de linhas de radar em tempo de execução rápido)
            const maxDistance = 150;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distSq = dx * dx + dy * dy; // Usa distância ao quadrado para pular o cálculo pesado de Math.sqrt

                    if (distSq < maxDistance * maxDistance) {
                        const dist = Math.sqrt(distSq);
                        const alpha = (1 - dist / maxDistance) * 0.18;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(0, 255, 102, ${alpha})`;
                        ctx.lineWidth = 0.55;
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(renderEnxame);
        };

        // Captura o movimento do ponteiro com debounce implícito
        window.addEventListener('mousemove', (e) => {
            STATE.mouse.targetX = e.clientX;
            STATE.mouse.targetY = e.clientY;
        });

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        renderEnxame();
    }

    /* ==========================================================================
       2. INTERFACE TELEMETRY: SCROLL PROGRESS & ACTIVE VIEWPORT ROUTING
       ========================================================================== */
    const progressBar = document.getElementById('readingProgress');
    const sections = document.querySelectorAll('section, main');
    const navLinks = document.querySelectorAll('.nav-links a');

    const updateScrollMetrics = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        // Algoritmo de intersecção ativa para iluminar os links corretos na barra de menu flutuante
        let currentActiveSectionId = "";
        sections.forEach(sec => {
            const top = sec.offsetTop - 280;
            const height = sec.offsetHeight;
            if (scrollTop >= top && scrollTop < top + height) {
                currentActiveSectionId = sec.getAttribute('id');
            }
        });

        if (currentActiveSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', updateScrollMetrics, { passive: true });

    /* ==========================================================================
       3. HIGH-END UI: EFEITO MAGNÉTICO PREMIUM NOS BOTÕES PRINCIPAIS
       ========================================================================== */
    const magneticButtons = document.querySelectorAll('.btn-epic-primary, .btn-telemetria, .btn-nav-cta');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const bound = btn.getBoundingClientRect();
            // Calcula o centro físico do botão
            const btnX = bound.left + bound.width / 2;
            const btnY = bound.top + bound.height / 2;
            // Distância matemática do mouse ao centro
            const movementX = e.clientX - btnX;
            const movementY = e.clientY - btnY;

            // Deslocamento físico elástico controlado (Efeito Atração Magnética)
            btn.style.transform = `translate(${movementX * 0.35}px, ${movementY * 0.35}px) scale(1.02)`;
            btn.style.transition = 'transform 0.1s ease';
        });

        btn.addEventListener('mouseleave', () => {
            // Devolve o botão suavemente para a posição padrão de repouso
            btn.style.transform = '';
            btn.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        });
    });

    /* ==========================================================================
       4. QUANTUM COUNTER MODULE: ENGENHARIA DE CONTADORES MATRICIAIS
       ========================================================================== */
    const triggerMatrixCounter = (el) => {
        el.classList.add('animated');
        const targetValue = parseInt(el.getAttribute('data-target'), 10);
        const textSuffix = el.innerText.replace('0', ''); // Captura automaticamente %, k, M
        const animationDuration = 2200; // Tempo total da subida numérica em milissegundos
        let startTimestamp = null;

        const animateStep = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            
            // Função de atenuação Quartic Ease-Out para desaceleração realista no final da contagem
            const progress = Math.min(elapsed / animationDuration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            const currentValue = Math.floor(easeProgress * targetValue);
            el.innerText = currentValue + textSuffix;

            if (progress < 1) {
                requestAnimationFrame(animateStep);
            } else {
                el.innerText = targetValue + textSuffix;
            }
        };
        requestAnimationFrame(animateStep);
    };

