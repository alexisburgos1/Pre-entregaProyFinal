function sendEmail(){ 
    
    const btn = document.getElementById('SendEmailId');
    document.getElementById('formEmail')
    .addEventListener('submit', function(event) {
        event.preventDefault();

        
        btn.value = 'Sending...';
        

        const serviceID = 'default_service';
        const templateID = 'template_44gzlvk';
        
        emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Send Email';
            alert('Thanks for your message, an auto-repy email was sent to your inbox');
        }, (err) => {
            btn.value = 'Send Email';
            alert(JSON.stringify(err));
        });
    });}
