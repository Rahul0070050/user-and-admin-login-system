const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const adminSignupUser = document.getElementById('admin-signup-btn');
const adminLoginUser = document.getElementById('admin-login-btn')
const editUSerBtn = document.getElementById('editUser-btn');
const tableBody = document.getElementById('table-body');
const input = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
let deletusr = document.getElementById('table-body');



deletusr?.addEventListener("click",(e) => {
    // console.log(e.target.getAttribute)
    let deleted = e.target.getAttribute('delete-user')
    if(deleted) {
        deleteUser(deleted)
    }
})



loginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
        var username = document.getElementById('user-name').value;
        var password = document.getElementById('password').value;
        let passwordErr = document.getElementById('password-err')
        let usernameErr = document.getElementById('user-name-error')

        let data = {
            username,
            password
        }
        fetch('/user/login', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },

        })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    let a = document.createElement('a')
                    a.setAttribute('href', '/user');
                    a.click();
                } else {
                    if(res.msg == 'user') {
                        usernameErr.innerText = 'user not found'
                    } else {
                        passwordErr.innerText = 'password not match'
                    }
                }
            })
        return;
    }
})
adminSignupUser?.addEventListener('click',(e) => {
    e.preventDefault();
    if (validateSignupForm()) {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var username = document.getElementById('user-name').value;
        var password = document.getElementById('password').value;

        let data = {
            name,
            email,
            username,
            password
        }
        fetch('/admin/signup', { 
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },

        }).then(res => res.json()).then(res => {
            console.log(res);
            if (res.success) {
                let a = document.createElement('a')
                a.setAttribute('href', '/admin');
                a.click();
            } else {
                var userNameErr = document.getElementById('user-name-error');
                var emailErr = document.getElementById('email-error');
                if (res.msg == 'email') {
                    emailErr.innerText = 'email is already taken'
                } else if (res.msg == 'username') {
                    userNameErr.innerText = 'username in already taken'
                }

                setInterval(() => {
                    userNameErr.innerText = ''
                    emailErr.innerText = ''
                }, 4000)
            }
        }).catch((err) => {
            console.log(err);
        })
        return;
    }

})
adminLoginUser?.addEventListener('click',(e) => {
    e.preventDefault()
    if (validateLoginForm()) {
        var username = document.getElementById('user-name').value;
        var password = document.getElementById('password').value;
        let passwordErr = document.getElementById('password-err')
        let usernameErr = document.getElementById('user-name-error')
        let data = {
            username,
            password
        }
        fetch('/admin/login', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },

        })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    let a = document.createElement('a')
                    a.setAttribute('href', '/admin');
                    a.click();
                } else {
                    if(res.msg == 'user') {
                        usernameErr.innerText = 'user not found'
                    } else {
                        passwordErr.innerText = 'password not match'
                    }
                }

                setTimeout(() => {
                    usernameErr.innerText = ''
                    passwordErr.innerText = ''
                }, 4000);
            })
        return;
    }
})
signupBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateSignupForm()) {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var username = document.getElementById('user-name').value;
        var password = document.getElementById('password').value;

        let data = {
            name,
            email,
            username,
            password
        }
        fetch('/user/signup', { 
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },

        }).then(res => res.json()).then(res => {
            if (res.success) {
                let a = document.createElement('a')
                a.setAttribute('href', '/user');
                a.click();
            } else {
                var userNameErr = document.getElementById('user-name-error');
                var emailErr = document.getElementById('email-error');
                if (res.msg == 'email') {
                    emailErr.innerText = 'email is already taken'
                } else if (res.msg == 'username') {
                    userNameErr.innerText = 'username in already taken'
                }

                setInterval(() => {
                    userNameErr.innerText = ''
                    emailErr.innerText = ''
                }, 4000)
            }
        }).catch((err) => {
            console.log(err);
        })
        return;
    }
})



editUSerBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateEditedForm()) {
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var username = document.getElementById('user-name').value;
        var _id = document.getElementById('id').value;

        let data = {
            name,
            email,
            username,
            _id
        }
        fetch('/admin/submit', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },

        }).then(res => {
            if (res.ok) {
                let a = document.createElement('a')
                a.setAttribute('href', '/admin');
                a.click();
            } else {
                return res.json()
            }
        }).then(res => {
            var userNameErr = document.getElementById('user-name-error');
            var emailErr = document.getElementById('email-error');
            if (res.msg == 'email') {
                emailErr.innerText = 'email is already taken'
            } else if (res.msg == 'username') {
                userNameErr.innerText = 'username already taken'
            }

            setInterval(() => {
                userNameErr.innerText = ''
                emailErr.innerText = ''
            }, 4000)
        }).catch((err) => {
            console.log(err);
        })
        return;
    }
})

searchBtn?.addEventListener('click', () => {
    let val = input.value;
    if (val) {

        fetch(`admin/search/${val}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => res.json())
            .then(res => {
                const { name, username, email, _id } = res;
                console.log(username);
                tableBody.innerHTML = `
                <tr id="table-body">
                <td id="id" hidden >${_id}</td>
                <td>${name}</td>
                <td id="username">${username}</td>
                <td>${email}</td>
                <td><a href="/admin/edit/${_id}" class="btn">edit</a></td>
                <td><button id="delete-user" class="btn">delete</button></td>
                <tr/>`
            });
    }
})



function deleteUser(_id) {
    if (confirm('do you want to delet this user')) {
        fetch('/admin/delete', {
            method: 'delete',
            body: JSON.stringify({ _id }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(res => res.json()).then(res => {
            tableBody.innerHTML = '';
            res.forEach(elm => {
                const { _id, name, username, email } = elm;
                tableBody.innerHTML += `
                <tr id="table-body">
                <td id="id" hidden >${_id}</td>
                <td>${name}</td>
                <td id="username">${username}</td>
                <td>${email}</td>
                <td><a href="/admin/edit/${_id}" class="btn">edit</a></td>
                <td><button id="delete-user" class="btn">delete</button></td>
                <tr/>`
            });
        })

    }

}






function validateUserName() {
    var userNameErr = document.getElementById('user-name-error');
    var userName = document.getElementById('user-name').value;

    if (userName.length == 0) {
        userNameErr.innerHTML = 'UserName is required';
        setTimeout(() => {
            userNameErr.innerText = '';
        }, 4000);
        return false;
    }

    userNameErr.innerHTML = ""
    return true
}


function validateName() {
    var nameErr = document.getElementById('name-error');
    var name = document.getElementById('name').value;

    if (name.length == 0) {
        nameErr.innerHTML = 'Name is required';
        setTimeout(() => {
            nameErr.innerText = '';
        }, 4000);
        return false;
    }

    nameErr.innerHTML = ""
    return true
}

function validatePassword() {
    var passwordErr = document.getElementById('password-err');
    var password = document.getElementById('password').value;

    if (password.length == 0) {
        passwordErr.innerHTML = 'password is required';
        setTimeout(() => {
            passwordErr.innerText = '';
        }, 4000);
        return false;
    }

    passwordErr.innerText = ''
    return true
}

function validateEmail() {
    var emailErr = document.getElementById('email-error');
    var email = document.getElementById('email').value;

    if (email.length == 0) {
        emailErr.innerHTML = 'Email is required';
        setTimeout(() => {
            emailErr.innerHTML = '';
        }, 4000)
        return false;
    }

    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailErr.innerHTML = 'Enter a valid email';
        return false;
    }
    emailErr.innerHTML = ""
    return true
}


function validateLoginForm() {
    if (!validateUserName() || !validatePassword()) {
        alert()
        return false;
    }
    return true;
}


function validateSignupForm() {
    if (!validateName() || !validateUserName() || !validateEmail() || !validatePassword()) {
        return false;
    }
    return true;
}


function validateEditedForm() {
    if (!validateName() || !validateUserName() || !validateEmail()) {
        return false;
    }
    return true;
}