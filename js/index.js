function redes(){
    alert("Esta opcion pronto estara disponible")
}

function setRegistro(){
    if($("#registro-password-1").val() == $("#registro-password-2").val()){
        $("#error").empty();
        $("#ok").empty();
        $("#ok").append("Perfecto: Las contraseñas coinciden");
        if($("#registro-nombre").val() == "" || $("#registro-email").val() == "" || $("#registro-password-1").val() =="" ){
            alert("Todos los campos son obligatorios")   
        }else{       
            $("#ok").append("Contraseñas son Identicas");
            let myData = {
                name: $("#registro-nombre").val(),
                email: $("#registro-email").val(),
                password: $("#registro-password-1").val()
            };
            let dataToSend = JSON.stringify(myData);
            $.ajax({
                url:"http://localhost:8080/api/user/new/",
                type:"POST",
                contentType: "application/json",
                dataType:"json",
                data: dataToSend,
                success:function(){
                    alert("Usuario Registrado Existosamente");
                    console.log("envio exitoso");
                    location.reload();
                }
            });
        } 
    } else{
        $("#ok").empty();
        $("#error").empty();
        $("#error").append("ERROR: Las contraseñas no coinciden");
    }
}

function logIn(){
    if($("#login-email").val() == "" || $("#login-password").val() == ""){
        alert("Todos los campos son obligatorios");
    }else{
        let email = $("#login-email").val()
        let password = $("#login-password").val()  
        $.ajax({
            dataType:"json",
            typ:"GET",
            url: "http://localhost:8080/api/user/"+email+"/"+password,
            success:function(json){
                if(json.id == null && json.name == "NO DEFINIDO"){
                    $("#inicio-fail").empty();
                    $("#inicio-ok").empty();
                    $("#inicio-fail").append("Error al iniciar sesion: usuario o contraseña incorrecto");
                }else{
                    $("#inicio-fail").empty();
                    $("#inicio-ok").empty();
                    $("#inicio-ok").append(json.name + " ha iniciado sesion")
                    alert("Bienvenido al sistema " + json.name)
                    console.log(json.name)
                }    
            }
        }) 
    }
}

function recuperarContraseña(){
    if($("#recovery-email").val() == ""){
        alert("Debes colocar el correo con que te registraste")
    }else{
        let email = $("#recovery-email").val()
        $.ajax({
            dataType:"json",
            typ:"GET",
            url: "http://localhost:8080/api/user/"+email,
            success:function(respuesta){
                if(respuesta == true){
                    alert("Hemos enviado la contraseña a tu correo")
                }else if(respuesta == false){
                    alert("Lo sentimos el correo ingresado no se encuentra registrado")
                }
            }
        })
    }
}