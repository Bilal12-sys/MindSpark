document.addEventListener('DOMContentLoaded', () => {
    let home = document.getElementById("home");
    let getb = document.getElementById("getbtn");

    if (getb) {
        getb.addEventListener('click', () => {
            window.location.href = "log-sign.html";
        });
    }
    if (home) {
        home.addEventListener('click', () =>{
            window.location.href = "index.html";
        });
    }

    const signupSection = document.getElementById('signup-section');
    const loginSection = document.getElementById('login-section');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const goToLoginBtn = document.getElementById('go-to-login');
    const goToSignupBtn = document.getElementById('go-to-signup');

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

    if (goToLoginBtn) {
        goToLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (signupSection) signupSection.style.display = "none";
            if (loginSection) loginSection.style.display = "block";
        });
    }

    if (goToSignupBtn) {
        goToSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginSection) loginSection.style.display = "none";
            if (signupSection) signupSection.style.display = "block";
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const users = JSON.parse(localStorage.getItem('mindspark_users')) || [];
            if (users.find(u => u.email === signupEmail.value || u.name === signupName.value)) {
                return Swal.fire({ icon: 'error', title: 'Error', text: 'Name or Email already exists!' });
            }
            const newUser = { 
                name: signupName.value.trim(), 
                email: signupEmail.value.trim(), 
                password: signupPass.value,
                photo: userPhotoBase64 
            };
            users.push(newUser);
            localStorage.setItem('mindspark_users', JSON.stringify(users));
            Swal.fire({ icon: 'success', title: 'Account Created!', timer: 2000, showConfirmButton: false }).then(() => {
                if (loginName) loginName.value = signupName.value;
                if (loginPass) loginPass.value = signupPass.value;
                signupForm.reset();
                if (goToLoginBtn) goToLoginBtn.click();
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
                Swal.fire({ icon: 'error', title: 'Login Failed' });
            }
        });
    }

    const loggedUser = JSON.parse(localStorage.getItem('mindspark_loggedUser'));
    const defaultPhoto = 'images/user.jpg';
    const photoSrc = (loggedUser && loggedUser.photo && loggedUser.photo.trim() !== "") ? loggedUser.photo : defaultPhoto;
    const profileElements = document.querySelectorAll('#user, #user-1, .profile-img, .user-img');
    profileElements.forEach(el => {
        if (!el) return;
        if (el.tagName === 'IMG') {
            el.src = photoSrc;
        } else {
            el.innerHTML = `<img src="${photoSrc}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
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