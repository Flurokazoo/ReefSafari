$(init);

function init(){

    console.log('check')
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.src = 'assets/img/koffiepot.jpg';
    image.onload = function(){
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        var dataURL = canvas.toDataURL('image/jpeg');
        console.log(dataURL);
    };


}

