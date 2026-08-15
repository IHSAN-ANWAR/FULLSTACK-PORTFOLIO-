// Modern Full Stack Portfolio - jQuery

$(document).ready(function() {
    
    // Navbar animation on load
    setTimeout(function() {
        $('.navbar').css({
            'opacity': '1',
            'transform': 'translateY(0)'
        });
    }, 100);
    
    // Hero animations
    setTimeout(function() {
        $('.hero-main').css({
            'opacity': '1',
            'transform': 'translateX(0)'
        });
    }, 300);
    
    setTimeout(function() {
        $('.hero-visual').css({
            'opacity': '1',
            'transform': 'translateX(0)'
        });
    }, 500);
    
    // Show about section on load if visible
    setTimeout(function() {
        checkScroll();
        // Experience cards are always visible - no animations needed
        $('.experience-content').css({
            'opacity': '1',
            'transform': 'translateX(0)'
        });
        // Certifications are always visible - no animations needed
        $('.cert-card, .cert-timeline-item').css({
            'opacity': '1',
            'transform': 'translateX(0)'
        });
    }, 100);
    
    // Hamburger menu toggle
    $('.hamburger').on('click', function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
        
        // Animate hamburger
        if ($(this).hasClass('active')) {
            $(this).find('span:nth-child(1)').css('transform', 'rotate(45deg) translateY(10px)');
            $(this).find('span:nth-child(2)').css('opacity', '0');
            $(this).find('span:nth-child(3)').css('transform', 'rotate(-45deg) translateY(-10px)');
        } else {
            $(this).find('span').css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });
    
    // Close menu on link click
    $('.nav-link').on('click', function() {
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
        $('.hamburger span').css({
            'transform': 'none',
            'opacity': '1'
        });
    });
    
    // Smooth scroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });
    
    // Active nav link on scroll
    function updateActiveNav() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            const section = $($(this).attr('href'));
            if (section.length) {
                const sectionTop = section.offset().top;
                const sectionBottom = sectionTop + section.outerHeight();
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $('.nav-link').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    }
    
    // Scroll animations with repeatable effect
    function checkScroll() {
        const windowTop = $(window).scrollTop();
        const windowBottom = windowTop + $(window).height();
        const isMobile = $(window).width() <= 768;
        const offset = isMobile ? 50 : 100; // Less offset on mobile
        const threshold = isMobile ? 0.2 : 0.3; // Show earlier on mobile
        
        // Update active nav
        updateActiveNav();
        
        // About section - image from left, details from right
        if ($('.about-image-wrapper').length && $('.about-details').length) {
            const aboutTop = $('.about-image-wrapper').offset().top;
            const aboutBottom = aboutTop + $('.about-image-wrapper').outerHeight();
            const triggerPoint = isMobile ? windowBottom - ($(window).height() * threshold) : windowBottom - offset;
            
            if (aboutTop < triggerPoint && aboutBottom > windowTop + 50) {
                $('.about-image-wrapper').css({
                    'opacity': '1',
                    'transform': 'translateX(0)',
                    'transition': 'all 0.8s ease'
                });
                $('.about-details').css({
                    'opacity': '1',
                    'transform': 'translateX(0)',
                    'transition': 'all 0.8s ease'
                });
            } else {
                if (!isMobile) {
                    $('.about-image-wrapper').css({
                        'opacity': '0',
                        'transform': 'translateX(-50px)'
                    });
                    $('.about-details').css({
                        'opacity': '0',
                        'transform': 'translateX(50px)'
                    });
                }
            }
        }
        
        // Experience section - always visible, no animations
        $('.experience-content').each(function(index) {
            // Keep cards always visible
            $(this).css({
                'opacity': '1',
                'transform': 'translateX(0)'
            });
        });
        
        // Skills section - fade from right
        if ($('.skills-grid').length) {
            const skillsTop = $('.skills-grid').offset().top;
            const skillsBottom = skillsTop + $('.skills-grid').outerHeight();
            const triggerPoint = isMobile ? windowBottom - ($(window).height() * threshold) : windowBottom - offset;
            
            if (skillsTop < triggerPoint && skillsBottom > windowTop + 50) {
                $('.skills-grid').css({
                    'opacity': '1',
                    'transform': 'translateX(0)',
                    'transition': 'all 0.8s ease'
                });
                
                // Animate skill bars
                $('.skill-progress').each(function() {
                    const progress = $(this).data('progress');
                    $(this).css('width', progress + '%');
                });
            } else {
                if (!isMobile) {
                    $('.skills-grid').css({
                        'opacity': '0',
                        'transform': 'translateX(50px)'
                    });
                    $('.skill-progress').css('width', '0');
                }
            }
        }
        
        // Gallery section
        $('.portfolio-item').each(function(index) {
            const galleryTop = $(this).offset().top;
            const galleryBottom = galleryTop + $(this).outerHeight();
            const triggerPoint = isMobile ? windowBottom - ($(window).height() * threshold) : windowBottom - offset;
            
            if (galleryTop < triggerPoint && galleryBottom > windowTop + 50) {
                setTimeout(() => {
                    $(this).addClass('show');
                }, index * 150);
            } else {
                if (!isMobile) {
                    $(this).removeClass('show');
                }
            }
        });
        
        // Projects section - alternate left/right
        $('.project-content, .project-image-wrapper').each(function(index) {
            const cardTop = $(this).offset().top;
            const cardBottom = cardTop + $(this).outerHeight();
            const isEven = index % 2 === 0;
            const triggerPoint = isMobile ? windowBottom - ($(window).height() * threshold) : windowBottom - offset;
            
            if (cardTop < triggerPoint && cardBottom > windowTop + 50) {
                setTimeout(() => {
                    $(this).css({
                        'opacity': '1',
                        'transform': 'translateX(0)',
                        'transition': 'all 0.8s ease'
                    });
                }, index * 150);
            } else {
                if (!isMobile) {
                    $(this).css({
                        'opacity': '0',
                        'transform': isEven ? 'translateX(-50px)' : 'translateX(50px)'
                    });
                }
            }
        });
        
        // Certifications section - always visible
        $('.cert-card, .cert-timeline-item').each(function(index) {
            // Keep certifications always visible
            $(this).css({
                'opacity': '1',
                'transform': 'translateX(0)'
            });
        });
        
        // Contact section - always visible on mobile, animated on desktop
        if ($('.contact-left').length && $('.contact-right').length) {
            const contactTop = $('.contact-left').offset().top;
            const contactBottom = contactTop + $('.contact-left').outerHeight();
            const triggerPoint = isMobile ? windowBottom - ($(window).height() * threshold) : windowBottom - offset;
            
            if (isMobile) {
                // Always visible on mobile
                $('.contact-left').css({
                    'opacity': '1',
                    'transform': 'translateX(0)'
                });
                $('.contact-right').css({
                    'opacity': '1',
                    'transform': 'translateX(0)'
                });
            } else {
                // Animated on desktop
                if (contactTop < triggerPoint && contactBottom > windowTop + 50) {
                    $('.contact-left').css({
                        'opacity': '1',
                        'transform': 'translateX(0)',
                        'transition': 'all 0.8s ease'
                    });
                    $('.contact-right').css({
                        'opacity': '1',
                        'transform': 'translateX(0)',
                        'transition': 'all 0.8s ease'
                    });
                } else {
                    $('.contact-left').css({
                        'opacity': '0',
                        'transform': 'translateX(-50px)'
                    });
                    $('.contact-right').css({
                        'opacity': '0',
                        'transform': 'translateX(50px)'
                    });
                }
            }
        }
    }
    
    // Run on scroll and load
    $(window).on('scroll', checkScroll);
    checkScroll();
    
    // Contact form validation with regex patterns
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        
        // Regex patterns for validation
        const nameRegex = /^[a-zA-Z\s]{2,50}$/; // Only letters and spaces, 2-50 chars
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email format
        const messageRegex = /^.{10,500}$/; // Any characters, 10-500 chars
        
        // Validation
        let isValid = true;
        
        // Clear previous errors
        $('.error-message').hide();
        $('.input-wrapper').removeClass('error');
        
        // Name validation using .test()
        if (!nameRegex.test(name)) {
            $('#nameError').text('Name must be 2-50 characters (letters only)').show();
            $('#name').closest('.input-wrapper').addClass('error');
            isValid = false;
        }
        
        // Email validation using .test()
        if (!emailRegex.test(email)) {
            $('#emailError').text('Please enter a valid email address').show();
            $('#email').closest('.input-wrapper').addClass('error');
            isValid = false;
        }
        
        // Message validation using .test()
        if (!messageRegex.test(message)) {
            $('#messageError').text('Message must be 10-500 characters').show();
            $('#message').closest('.input-wrapper').addClass('error');
            isValid = false;
        }
        
        if (isValid) {
            // Disable submit button to prevent double submission
            const submitBtn = $('.btn-submit');
            const originalText = submitBtn.find('.btn-text').text();
            submitBtn.prop('disabled', true);
            submitBtn.find('.btn-text').text('Sending...');
            
            // Send to backend using FormData (traditional PHP POST)
            $.ajax({
                url: 'backend/contact.php',
                type: 'POST',
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                success: function(response) {
                    // Clear form
                    $('#contactForm')[0].reset();
                    $('.input-wrapper').removeClass('error');
                    
                    // Re-enable button
                    submitBtn.prop('disabled', false);
                    submitBtn.find('.btn-text').text(originalText);
                    
                    // Show success modal
                    $('#successModal').css('display', 'flex');
                },
                error: function(xhr, status, error) {
                    // Re-enable button
                    submitBtn.prop('disabled', false);
                    submitBtn.find('.btn-text').text(originalText);
                    
                    // Try to parse error response
                    let errorMessage = 'Failed to send message. Please try again or email directly.';
                    
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.message) {
                            errorMessage = response.message;
                        }
                    } catch (e) {
                        // If not JSON, check if it's a network error
                        if (status === 'error' && xhr.status === 0) {
                            errorMessage = 'Cannot connect to server. Please check if the backend is running or email directly at ihsan.anwar4321@gmail.com';
                        }
                    }
                    
                    // Show error message in a better way
                    alert(errorMessage);
                }
            });
        }
    });
    
    // Real-time validation on input
    $('#name').on('input', function() {
        const nameRegex = /^[a-zA-Z\s]{2,50}$/;
        const value = $(this).val().trim();
        
        if (value && !nameRegex.test(value)) {
            $('#nameError').text('Only letters and spaces allowed (2-50 chars)').show();
            $(this).closest('.input-wrapper').addClass('error');
        } else {
            $('#nameError').hide();
            $(this).closest('.input-wrapper').removeClass('error');
        }
    });
    
    $('#email').on('input', function() {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const value = $(this).val().trim();
        
        if (value && !emailRegex.test(value)) {
            $('#emailError').text('Invalid email format').show();
            $(this).closest('.input-wrapper').addClass('error');
        } else {
            $('#emailError').hide();
            $(this).closest('.input-wrapper').removeClass('error');
        }
    });
    
    $('#message').on('input', function() {
        const messageRegex = /^.{10,500}$/;
        const value = $(this).val().trim();
        
        if (value && !messageRegex.test(value)) {
            $('#messageError').text('Message must be 10-500 characters').show();
            $(this).closest('.input-wrapper').addClass('error');
        } else {
            $('#messageError').hide();
            $(this).closest('.input-wrapper').removeClass('error');
        }
    });
    
    // Close modal
    $('#closeModal').on('click', function() {
        $('#successModal').css('display', 'none');
    });
    
    // Close modal on outside click
    $('#successModal').on('click', function(e) {
        if (e.target === this) {
            $(this).css('display', 'none');
        }
    });
    
    // Parallax effect on hero
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('.hero-content').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
    });
    
    // Add hover effect to project cards
    $('.project-card').hover(
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.project-image img').css('transform', 'scale(1)');
        }
    );
    
    // Dropdown menu for mobile
    $('.dropdown > .nav-link').on('click', function(e) {
        if ($(window).width() <= 968) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
        }
    });
    
});

// Video hover play/pause for project cards — triggers on whole card
$(document).on('mouseenter', '.project-sticky-item .project-content', function() {
    var video = $(this).find('.project-video')[0];
    if (video) {
        // Golden Skills video ko faster speed
        if (video.src && video.src.toLowerCase().includes('goldenskills')) {
            video.playbackRate = 6.0;
        } else {
            video.playbackRate = 2.4;
        }
        video.play();
    }
}).on('mouseleave', '.project-sticky-item .project-content', function() {
    var video = $(this).find('.project-video')[0];
    if (video) { video.pause(); video.currentTime = 0; }
});

// Pre-buffer all project videos on page load for instant hover play
$(window).on('load', function() {
    $('.project-video').each(function() {
        var video = this;
        video.muted = true;
        video.play().then(function() {
            video.pause();
            video.currentTime = 0;
        }).catch(function() {});
    });
});
