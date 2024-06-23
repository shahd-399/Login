var userName = document.getElementById('userName');
var userMail = document.getElementById('userMail');
var userPassword = document.getElementById('userPassword');
var SignUpBtn = document.getElementById('SignUpBtn');
var signInLink = document.getElementById('signInLink');
var msgs = document.querySelectorAll('.msg');

var loginList
if(localStorage.getItem('list')!=null){
    loginList = JSON.parse(localStorage.getItem('list'))
}
else
    loginList = [];


SignUpBtn.addEventListener('click',function(e){
    e.preventDefault();
    addItem();
})

function addItem(){
    if(userName.value=="" || userMail.value=="" || userPassword.value=="")
        {
            msgs[2].classList.replace('d-none','d-block')
            msgs[0].classList.replace('d-block','d-none')
            msgs[1].classList.replace('d-block','d-none')
        }
    else{
        if(chickIfEmailAlreadyExist(userMail.value) && isValidMail()){
            var loginobj = {
                uName : userName.value,
                uMail : userMail.value,
                uPassword : userPassword.value,
            }
            loginList.push(loginobj)
            localStorage.setItem('list',JSON.stringify(loginList))
            msgs[0].classList.replace('d-none','d-block')
            msgs[1].classList.replace('d-block','d-none')
            msgs[2].classList.replace('d-block','d-none')
        }
        else{
            msgs[1].classList.replace('d-none','d-block')
            msgs[0].classList.replace('d-block','d-none')
            msgs[2].classList.replace('d-block','d-none')
        }
    }
}
function chickIfEmailAlreadyExist(currentMail){
    var flag = true;
    for(var i=0;i<loginList.length;i++){
        if(currentMail == loginList[i].uMail){
            flag =false;
            break;
        }
    }
    if(flag)
        return true;
    else
        return false;
}


var signUpBox = document.querySelector('.signUp-box');
var loginBox = document.querySelector('.login-box');
var loginBtn = document.getElementById('loginBtn');
var signUpLink = document.getElementById('signUpLink');

signInLink.addEventListener('click' , function(e)
{
    e.preventDefault();
    signUpBox.classList.replace('d-block' , 'd-none')
    loginBox.classList.replace('d-none' , 'd-block')
})
signUpLink.addEventListener('click' , function(e)
{
    e.preventDefault();
    loginBox.classList.replace('d-block' , 'd-none')
    signUpBox.classList.replace('d-none' , 'd-block')
})

loginBtn.addEventListener('click',function(e){
    e.preventDefault();
    login();
})
var loginMail = document.getElementById('loginMail');
var loginPassword = document.getElementById('loginPassword');
var msgLogin = document.querySelectorAll('.msg2');
var nav = document.querySelector('.navbar')
var wellcomeBox = document.querySelector('.wellcome')

var gIndex;
function chickMailAndPassword(mail,pass){
    var flag = false;
    for(var i=0;i<loginList.length;i++){
        if(mail == loginList[i].uMail && pass == loginList[i].uPassword){
            flag =true;
            gIndex=i;
            break;
        }
    }
    if(flag)
        return true;
    else
        return false;
}
function login(){
    if(loginMail.value == "" || loginPassword.value == ""){
        msgLogin[1].classList.replace('d-none','d-block')
        msgLogin[0].classList.replace('d-block','d-none')
    }
    else{
        if(chickMailAndPassword(loginMail.value,loginPassword.value)){
            msgLogin[0].classList.replace('d-block','d-none')
            msgLogin[1].classList.replace('d-block','d-none')

            loginBox.classList.replace('d-block' , 'd-none')
            signUpBox.classList.replace('d-block' , 'd-none')
            nav.classList.replace('d-none','d-block')
            wellcomeBox.classList.replace('d-none','d-block')

            var h1 =document.createElement('h1');
            h1.innerHTML = `Welcome ${loginList[gIndex].uName}`
            wellcomeBox.appendChild(h1)
        }
        else{
            msgLogin[0].classList.replace('d-none','d-block')
            msgLogin[1].classList.replace('d-block','d-none')
        }
    }
}
var LogoutBtn = document.querySelector('.btn-outline-warning')
LogoutBtn.addEventListener('click' , function(e){
    e.preventDefault();
    nav.classList.replace('d-block' , 'd-none')
    wellcomeBox.classList.replace('d-block' , 'd-none')
    loginBox.classList.replace('d-none','d-block')
})
var inputs =document.querySelectorAll('input');
inputs.forEach(function(ele){
    ele.addEventListener('click',function(e){
        e.target.style.color='white'
    })
})

function isValidMail() {
    var rehEmail = new RegExp('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')
if(rehEmail.test(userMail.value)){
    return true;
}
else{
    return false
}
}