document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById("home");
    const getBtn = document.getElementById("getbtn");
    
    const signupSection = document.getElementById('signup-section');
    const loginSection = document.getElementById('login-section');
    const toggleToLogin = document.getElementById('toggle-to-login');
    const toggleToSignup = document.getElementById('toggle-to-signup');
    
    const goToLoginBtn = document.getElementById('go-to-login');
    const goToSignupBtn = document.getElementById('go-to-signup');
    const link = document.getElementById('link');

    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    const signupName = document.getElementById('signup-name');
    const signupEmail = document.getElementById('signup-email');
    const signupPass = document.getElementById('signup-pass');
    const loginName = document.getElementById('login-name');
    const loginPass = document.getElementById('login-pass');

    let profileFile = document.getElementById('profile-file');
    let imagePreview = document.getElementById('imagePreview');
    let profileText = document.querySelector('.profile-upload-field input[type="text"]');
    let userPhotoBase64 = ""; 

    if (profileFile) {
        profileFile.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                if (file.size > 1024 * 1024) {
                    this.value = "";
                    return Swal.fire({ icon: 'error', title: 'File too large', text: 'Please choose an image under 1MB.' });
                }
                if (profileText) profileText.value = file.name;
                const reader = new FileReader();
                reader.onload = function(e) {
                    userPhotoBase64 = e.target.result;
                    if (imagePreview) {
                        imagePreview.innerHTML = `<img src="${userPhotoBase64}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (getBtn) {
        getBtn.addEventListener('click', () => { window.location.href = "log-sign.html"; });
    }
    if (homeBtn) {
        homeBtn.addEventListener('click', () => { window.location.href = "index.html"; });
    }

    const showLogin = () => {
        if (signupSection) signupSection.style.display = "none";
        if (loginSection) loginSection.style.display = "block";
        if (toggleToLogin) toggleToLogin.style.display = "none";
        if (toggleToSignup) toggleToSignup.style.display = "block";
    };

    const showSignup = () => {
        if (loginSection) loginSection.style.display = "none";
        if (signupSection) signupSection.style.display = "block";
        if (toggleToSignup) toggleToSignup.style.display = "none";
        if (toggleToLogin) toggleToLogin.style.display = "block";
    };

    if (goToLoginBtn) goToLoginBtn.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });
    if (goToSignupBtn) goToSignupBtn.addEventListener('click', (e) => { e.preventDefault(); showSignup(); });
    
    if (link) {
        link.style.cursor = "pointer";
        link.addEventListener('click', (e) => { 
            e.preventDefault(); 
            showSignup(); 
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const users = JSON.parse(localStorage.getItem('mindspark_users')) || [];
            const nameVal = signupName.value.trim();
            const emailVal = signupEmail.value.trim();

            if (users.find(u => u.email === emailVal || u.name === nameVal)) {
                return Swal.fire({ icon: 'error', title: 'Error', text: 'Name or Email already exists!' });
            }

            const newUser = { 
                name: nameVal, 
                email: emailVal, 
                password: signupPass.value,
                photo: userPhotoBase64 || null 
            };

            users.push(newUser);
            localStorage.setItem('mindspark_users', JSON.stringify(users));

            Swal.fire({ icon: 'success', title: 'Account Created!', timer: 1500, showConfirmButton: false }).then(() => {
                loginName.value = nameVal;
                loginPass.value = signupPass.value;
                signupForm.reset();
                if (imagePreview) imagePreview.innerHTML = '<i class="fa-solid fa-user-plus"></i>';
                showLogin();
            });
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const users = JSON.parse(localStorage.getItem('mindspark_users')) || [];
            const foundUser = users.find(u => u.name === loginName.value.trim() && u.password === loginPass.value);
            
            if (foundUser) {
                localStorage.setItem('mindspark_loggedUser', JSON.stringify(foundUser));
                window.location.href = 'dashboard.html';
            } else {
                Swal.fire({ icon: 'error', title: 'Login Failed', text: 'Invalid username or password' });
            }
        });
    }

    const user = JSON.parse(localStorage.getItem("mindspark_loggedUser"));
    const photo = (user && user.photo) ? user.photo : "images/user.jpg";

    document.querySelectorAll("#user, #user-1, .profile-img, .user-img").forEach(el => {
        if (el.tagName === "IMG") {
            el.src = photo;
        } else {
            el.innerHTML = `<img src="${photo}" class="profile-pic" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
        }
    });

    const b1 = document.getElementById('btn1');
    const b2 = document.getElementById('btn2');
    const b3 = document.getElementById('btn3');
    if (b1) b1.addEventListener('click', () => startQuiz('html'));
    if (b2) b2.addEventListener('click', () => startQuiz('css'));
    if (b3) b3.addEventListener('click', () => startQuiz('javascript'));
});

function startQuiz(category) {
    localStorage.setItem('userChoice', category);
    window.location.href = "quiz.html";
}