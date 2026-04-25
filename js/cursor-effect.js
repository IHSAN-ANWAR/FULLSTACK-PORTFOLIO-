// Smokey Cursor Effect with jQuery

$(document).ready(function() {
    
    // Create cursor elements
    $('body').append('<div class="cursor"></div>');
    $('body').append('<div class="cursor-follower"></div>');
    $('body').append('<div class="cursor-glow"></div>');
    
    const cursor = $('.cursor');
    const follower = $('.cursor-follower');
    const glow = $('.cursor-glow');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let glowX = 0, glowY = 0;
    
    // Track mouse movement
    $(document).on('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position immediately
        cursor.css({
            left: mouseX - 10 + 'px',
            top: mouseY - 10 + 'px'
        });
        
        // Create smoke particles
        createSmokeParticle(mouseX, mouseY);
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.css({
            left: followerX - 20 + 'px',
            top: followerY - 20 + 'px'
        });
        
        glowX += (mouseX - glowX) * 0.05;
        glowY += (mouseY - glowY) * 0.05;
        
        glow.css({
            left: glowX - 100 + 'px',
            top: glowY - 100 + 'px'
        });
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Optimized expanding smoke particles
    let particleCount = 0;
    const maxParticles = 25; // Reduced from 60
    let lastParticleTime = 0;
    const particleDelay = 80; // Increased from 30ms for better performance
    
    function createSmokeParticle(x, y) {
        const currentTime = Date.now();
        if (particleCount >= maxParticles || currentTime - lastParticleTime < particleDelay) return;
        
        lastParticleTime = currentTime;
        particleCount++;
        
        const particle = $('<div class="smoke-particle"></div>');
        
        // More dramatic random movement for expansion effect
        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const randomX = Math.cos(angle) * distance;
        const randomY = Math.sin(angle) * distance;
        
        // Random smoke variation with new glow option
        const variations = ['light', 'medium', 'dark', 'glow'];
        const randomVariation = variations[Math.floor(Math.random() * variations.length)];
        particle.addClass(randomVariation);
        
        // Random initial size for variety
        const initialSize = 6 + Math.random() * 6;
        
        particle.css({
            left: x + 'px',
            top: y + 'px',
            '--tx': randomX + 'px',
            '--ty': randomY + 'px',
            width: initialSize + 'px',
            height: initialSize + 'px'
        });
        
        $('body').append(particle);
        
        // Remove particle after animation (optimized duration)
        const duration = 1500 + Math.random() * 500;
        setTimeout(function() {
            particle.remove();
            particleCount--;
        }, duration);
    }
    
    // Click ripple effect
    $(document).on('mousedown', function(e) {
        const ripple = $('<div class="click-ripple"></div>');
        
        ripple.css({
            left: e.clientX - 10 + 'px',
            top: e.clientY - 10 + 'px'
        });
        
        $('body').append(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });
    
    // Hover effects on interactive elements
    $('a, button, .btn, input, textarea').hover(
        function() {
            cursor.css({
                transform: 'scale(1.5)',
                background: 'rgba(255, 255, 255, 0.2)'
            });
            follower.css({
                transform: 'scale(1.8)',
                borderColor: 'rgba(255, 255, 255, 0.6)'
            });
        },
        function() {
            cursor.css({
                transform: 'scale(1)',
                background: 'transparent'
            });
            follower.css({
                transform: 'scale(1)',
                borderColor: 'rgba(255, 255, 255, 0.3)'
            });
        }
    );
    
});
