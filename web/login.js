function loginUser() {
    var form = document.getElementById("login");
    axios({
      method: 'post',
      url: 'http://localhost:3306/login',
      data: {
        id: form.id.value,
        password: form.password.value
      }
    }).then((response) => {
      console.log("response.data:" , response.data);
      return response.data;
    }).then((data) => {
      if (data.flag == false) {
        //메세지 띄우기
        let alert_html = "<h6 class='fw-bold text-center mt-5'>다시 로그인해주세요.</h6>";
        document.getElementById("alert").innerHTML = alert_html;
      } else {
        alert("로그인 성공");
  
        window.location.href = "index.html";
      }     
    });
  }
  