var lastIDColonna=0;
var ausTitolo;
var x;
   $(document).ready(function() {

    $(document).on('change', '.custom-select', function(e) {
      var y=this.id.split('_');
      var value =this.value;
      var tileid = this.id;
      var array = tileid.split('_');
      tileid= array[0]+'_'+array[1];
      var x=y[0]+"_"+y[1];
      tileid+='_draggable';
      tileid=document.getElementById(tileid);
      var type = $(tileid).find('.card-body').attr('id');
      type+='';
      type=type.split('_')[2];
      var dragger = this.id;
      var array2 = dragger.split('_');
      dragger = array2[0];
      dragger+='d';
      dragger = document.getElementById(dragger);
     
      value+='d';
      var colonna =value.substring(0,value.length-1);
      value = document.getElementById(value);
      
      var cardbody=$(tileid).find('.card-body').attr('id');
      cardbody = document.getElementById(cardbody);
      var numberOfChildren = value.getElementsByClassName('card').length;
     
      cardbody.id=colonna+'_'+numberOfChildren+'_'+type;
      dragger.removeChild(tileid);
      value.appendChild(tileid);
      var nuovo=colonna+'_'+numberOfChildren;
      $.ajax({
        url:"http://localhost:8080/spostaTile/"+x+"/"+type+"/"+nuovo,
        type: "POST",
        success: function(result){
          
      
          window.location.reload();
  
        }
      })
   });
    
    
    
    
  
      $.get("http://localhost:8080/colonne", function(data){
        list_colonne=data;
         data.forEach(printColonne);
  
        
  
      });
  
      $.get("http://localhost:8080/getLastID", function(data){
            lastIDColonna=data;
  
      });
      
    

    $(document).on('click', '.add', function(e) {
      var cardcont = this.id;
      var p=this.id;
      if(p!="toggler-button"){

          if(cardcont[cardcont.length-1]=="t"){
            var id_dragger=cardcont;
            id_dragger+='';
            var id_tile=id_dragger.substring(0,id_dragger.length-1);
            cardcont+='c';
            var foo=$(this).closest('.board-list').attr('id');
            foo=foo.substring(0,foo.length-1);
            foo+='d';
            var dragger = document.getElementById(foo); 
            var numberOfChildren = dragger.getElementsByClassName('card').length;

            var newdivcontainer=document.createElement('div');
            newdivcontainer.className+="container";
            var newdivc=document.createElement('div');
            newdivc.className+="row";
            var newdivcol=document.createElement('div');
            newdivcol.className+="col";
            var newdivcols=document.createElement('div');
            newdivcols.id=id_tile+"_"+numberOfChildren+"_cols";
            newdivcols.className+="cols";
            newdivcols.className+=" hidden";
            
            var newdiv2  = document.createElement('div');
            newdiv2.id=id_tile+"_"+numberOfChildren+'_draggable';
            //newdiv2.setAttribute('draggable', 'true')
            newdiv2.className+='card';
            newdiv2.className+=' box';
            newdiv2.style.width='18rem'
            var newdiv3  = document.createElement('div');
            newdiv3.id=id_tile+"_"+numberOfChildren+"_t";
            newdiv3.className+='card-body';
            newdiv3.className+=' hidden';
            

            var newul=document.createElement('ul');
            newul.id=id_tile+"_"+numberOfChildren+'_type';
            newul.className+='navbar-nav';
            newul.className+=' col-menu';

            var newli=document.createElement('li');
            newli.className+='nav-item';
            newli.className+=' dropdown';

            var newamenu = document.createElement('a');
            newamenu.className+='nav-link';
            newamenu.className+=' dropdown-toggle';
            newamenu.href="#";
            newamenu.id='navbarDropdownMenuLink';
            newamenu.setAttribute('data-toggle', 'dropdown');
            newamenu.setAttribute('aria-haspopup', 'true');
            newamenu.setAttribute('aria-expanded', 'false');

            var newi2 = document.createElement('i');
            newi2.className+='fas';
            newi2.className+=' fa-cog';

            var newdivmenu = document.createElement('div');
            newdivmenu.id=lastIDColonna+'_divmenu';
            newdivmenu.className+='dropdown-menu';
            newdivmenu.setAttribute('aria-labelledby','navbarDropdownMenuLink');

            
          var neworg= document.createElement('a');
          neworg.id=id_tile+"_"+numberOfChildren+'_org';
          neworg.className+='dropdown-item';
          neworg.className+=' type';
          neworg.href="#";
          neworg.innerHTML ="Organizzativo";

          var newinf = document.createElement('a');
          newinf.id=id_tile+"_"+numberOfChildren+'_inf';
          newinf.className+='dropdown-item';
          newinf.className+=' type';
          newinf.href="#";
          newinf.innerHTML ="Informativo";

            var newtext =document.createElement('textarea');
            newtext.id=id_tile+"_"+numberOfChildren+'_text';
            newtext.className+='void-text-tile';
            newtext.setAttribute('spellcheck', 'false');
            newtext.setAttribute('placeholder','Text');
            newtext.setAttribute('disabled',true);


            var newtext2 =document.createElement('textarea');
            newtext2.id=id_tile+"_"+numberOfChildren+'_title';
            newtext2.className+='void-title-tile';
            newtext2.setAttribute('maxlength', '50');
            newtext2.setAttribute('spellcheck', 'false');
            newtext2.style.height='55px';
            newtext2.setAttribute('placeholder','Title tile');
            var newelimina = document.createElement('a');
            newelimina.className+='nav-link';
            newelimina.href="#";
            var newi = document.createElement('i');
            newi.className+='fas';
            newi.className+=' fa-times';

            newdivcol.appendChild(newelimina);
            newdivc.appendChild(newdivcol);
            newdivc.appendChild(newdivcols);
            newdivcontainer.appendChild(newdivc);

            newdivmenu.appendChild(newinf);
            newdivmenu.appendChild(neworg);
            newamenu.appendChild(newi2);
            
            newli.appendChild(newamenu);
            newli.appendChild(newdivmenu);
            newul.appendChild(newli);
            newdiv2.appendChild(newul);

            newelimina.appendChild(newi);
            newdiv3.appendChild(newtext2);
            newdiv3.appendChild(newtext);
          
            newdiv2.appendChild(newdiv3);
            newdiv2.appendChild(newdivcontainer);
            //newdiv.appendChild(newdiv2);

            id_dragger=id_dragger.substring(0,id_dragger.length-1);
            id_dragger+='d';
          
            document.getElementById(id_dragger).appendChild(newdiv2);
          

        }else if(cardcont[cardcont.length-1]=="i"){  
            var id_dragger=cardcont;
            id_dragger+='';
            var id_tile=id_dragger.substring(0,id_dragger.length-1);
            cardcont+='c';
            var foo=$(this).closest('.board-list').attr('id');
            foo=foo.substring(0,foo.length-1);
            foo+='d';
            var dragger = document.getElementById(foo); 
            var numberOfChildren = dragger.getElementsByClassName('card').length;
          
            var newdiv2  = document.createElement('div');
            newdiv2.id=id_tile+"_"+numberOfChildren+'_draggable';
            //newdiv2.setAttribute('draggable', 'true')
            newdiv2.className+='card';
            newdiv2.className+=' box';
            newdiv2.style.width='18rem';

            var newdiv3  = document.createElement('div');
            newdiv3.id=id_tile+"_"+numberOfChildren+"_i";
            newdiv3.className+='card-body';
            newdiv3.className+=' hidden';
            
            
            var newdivcontainer=document.createElement('div');
            newdivcontainer.className+="container";
            var newdivc=document.createElement('div');
            newdivc.className+="row";
            var newdivcol=document.createElement('div');
            newdivcol.className+="col";
            var newdivcols=document.createElement('div');
            newdivcols.id=id_tile+"_"+numberOfChildren+"_cols";
            newdivcols.className+="cols";
            newdivcols.className+=" hidden";


            var newtext2 =document.createElement('textarea');
            newtext2.id=id_tile+"_"+numberOfChildren+'_title';
            newtext2.className+='void-title-tile';
            newtext2.setAttribute('maxlength', '50');
            newtext2.setAttribute('spellcheck', 'false');
            newtext2.style.height='55px';
            newtext2.setAttribute('placeholder','Tile text');

            var newul=document.createElement('ul');
            newul.id=id_tile+"_"+numberOfChildren+'_type';
            newul.className+='navbar-nav';
            newul.className+=' col-menu';

            var newli=document.createElement('li');
            newli.className+='nav-item';
            newli.className+=' dropdown';

            var newamenu = document.createElement('a');
            newamenu.className+='nav-link';
            newamenu.className+=' dropdown-toggle';
            newamenu.href="#";
            newamenu.id='navbarDropdownMenuLink';
            newamenu.setAttribute('data-toggle', 'dropdown');
            newamenu.setAttribute('aria-haspopup', 'true');
            newamenu.setAttribute('aria-expanded', 'false');

            var newi2 = document.createElement('i');
            newi2.className+='fas';
            newi2.className+=' fa-cog';

            var newdivmenu = document.createElement('div');
            newdivmenu.id=lastIDColonna+'_divmenu';
            newdivmenu.className+='dropdown-menu';
            newdivmenu.setAttribute('aria-labelledby','navbarDropdownMenuLink');

            
          var neworg= document.createElement('a');
          neworg.id=id_tile+"_"+numberOfChildren+'_org';
          neworg.className+='dropdown-item';
          neworg.className+=' type';
          neworg.href="#";
          neworg.innerHTML ="Organizzativo";

          var newinf = document.createElement('a');
          newinf.id=id_tile+"_"+numberOfChildren+'_inf';
          newinf.className+='dropdown-item';
          newinf.className+=' type';
          newinf.href="#";
          newinf.innerHTML ="Informativo";

          var newsalva = document.createElement('button');
          newsalva.id = id_tile+"_"+numberOfChildren+'_salva';
          newsalva.type='button';
          newsalva.className+='text';
          newsalva.className+=' btn';
          newsalva.className+=' btn-outline-primary';
          newsalva.className+=' hidden';
          newsalva.className+=' loaded';
          newsalva.innerHTML ="Salva immagine";


            var newinput =document.createElement('input');
            newinput.id= id_tile+"_"+numberOfChildren+"_input";
            newinput.setAttribute('disabled',true);
            
            newinput.type="file";
            newinput.className="myFile";
            newinput.className+=' dynamicElement';
            var newelimina = document.createElement('a');
            newelimina.className+='nav-link';
            newelimina.href="#";
            var newi = document.createElement('i');
            newi.className+='fas';
            newi.className+=' fa-times';
            var newimage = document.createElement('img');
            newimage.id= id_tile+"_"+numberOfChildren+"_image";
            newimage.className+="card-img-top";
            newimage.src="";

            newdivcol.appendChild(newelimina);
            newdivc.appendChild(newdivcol);
            newdivc.appendChild(newdivcols);
            newdivcontainer.appendChild(newdivc);

            newdivmenu.appendChild(newinf);
            newdivmenu.appendChild(neworg);
            newamenu.appendChild(newi2);
            
            newli.appendChild(newamenu);
            newli.appendChild(newdivmenu);
            newul.appendChild(newli);
            newdiv2.appendChild(newul);

            newelimina.appendChild(newi);
            newdiv3.appendChild(newtext2);
            newdiv2.appendChild(newdiv3);
            newdiv2.appendChild(newul);
            
            newdiv3.appendChild(newimage);
            newdiv3.appendChild(newinput);
            newdiv3.appendChild(newsalva);
            newdiv2.appendChild(newdivcontainer);
            //newdiv.appendChild(newdiv2);
            id_dragger=id_dragger.substring(0,id_dragger.length-1);
            id_dragger+='d';
            document.getElementById(id_dragger).appendChild(newdiv2);
        }else{
          
          //colonne
          lastIDColonna++;
          var newboard  = document.createElement('div');
          newboard.className+='board-list';
          newboard.id=lastIDColonna+'b'; //boardlist non serve id diverso
          var newlistmenu = document.createElement('div');
          newlistmenu.className+='list-title';
          newlistmenu.className+=' collapse';
          newlistmenu.className+=' navbar-collapse';
      
          var newtext =document.createElement('textarea');
          newtext.id=lastIDColonna+'_text';
          newtext.className+='void-colonne';
          newtext.setAttribute('spellcheck', 'false');
          newtext.setAttribute('placeholder', 'Bord-title');
          
        
          var newul = document.createElement('ul');
          newul.className+='navbar-nav';
          newul.className+=' col-menu';
        
          var newli = document.createElement('li');
          newli.className+='nav-item';
          newli.className+=' dropdown';
        
          var newamenu = document.createElement('a');
          newamenu.className+='nav-link';
          newamenu.className+=' dropdown-toggle';
          newamenu.href="#";
          newamenu.id='navbarDropdownMenuLink';
          newamenu.setAttribute('data-toggle', 'dropdown');
          newamenu.setAttribute('aria-haspopup', 'true');
          newamenu.setAttribute('aria-expanded', 'false');
        
          var newi = document.createElement('i');
          newi.className+='fas';
          newi.className+=' fa-bars';
        
          var newdivmenu = document.createElement('div');
          newdivmenu.id=lastIDColonna+'_divmenu';
          newdivmenu.className+='dropdown-menu';
          newdivmenu.setAttribute('aria-labelledby','navbarDropdownMenuLink');
        
          var newae = document.createElement('a');
          newae.className+='dropdown-item';
          newae.className+=' el';
          newae.href="#";
          newae.innerHTML ="Elimina";
          

        
          var newdragger = document.createElement('div');
          newdragger.id=lastIDColonna+"d";
          newdragger.className+='dragger';
        
          var newdivcont = document.createElement('div');
          newdivcont.className+='container';
          
          var newbuttont = document.createElement('button');
          newbuttont.id = lastIDColonna+'t';
          newbuttont.type='button';
          newbuttont.className+='text';
          newbuttont.className+=' btn';
          newbuttont.className+=' btn-outline-primary';
          newbuttont.className+=' dyncol';
          newbuttont.className+=' add';
          newbuttont.innerHTML ="Add text tile";
          newbuttont.setAttribute('disabled',true);

          var newbuttoni = document.createElement('button');
          newbuttoni.id = lastIDColonna+'i';
          newbuttoni.type='button';
          newbuttoni.className+='img';
          newbuttoni.className+=' btn';
          newbuttoni.className+=' btn-outline-primary';
          newbuttoni.className+=' dyncol';
          newbuttoni.className+=' add';
          newbuttoni.innerHTML ="Add image tile";
          newbuttoni.setAttribute('disabled',true);


          var newbr = document.createElement('br');

          newdivcont.appendChild(newbuttont);
          newdivcont.appendChild(newbr);
          newdivcont.appendChild(newbuttoni);

          newamenu.appendChild(newi);

          newdivmenu.appendChild(newae);
        
          newli.appendChild(newamenu);
          newli.appendChild(newdivmenu);


          newul.appendChild(newli);

          newlistmenu.appendChild(newtext);
          newlistmenu.appendChild(newul);

          newboard.appendChild(newlistmenu);
          newboard.appendChild(newdragger);
          newboard.appendChild(newdivcont);
          document.getElementById('cf').appendChild(newboard);
          newtext.select();
          
        
        }
  }
   });
   $(".dyncol").on('click', function(e){//creo i tile nella colonna dinamica
    var cardcont = this.id;
    if(cardcont[1]=="t"){
      cardcont = cardcont[0];
      cardcont+='c';
      var newdiv2  = document.createElement('div');
      newdiv2.className+='card';
      newdiv2.className+=' box';
      newdiv2.style.width='18rem'
      var newdiv3  = document.createElement('div');
      newdiv3.className+='card-body';
      var newtext =document.createElement('textarea');
      newtext.setAttribute('spellcheck', 'false');
      newtext.innerHTML ="Some quick example text to build on the card title and make up the bulk of the card's content.";
      var newtext2 =document.createElement('textarea');
      newtext2.setAttribute('maxlength', '50');
      newtext2.setAttribute('spellcheck', 'false');
      newtext2.style.height='55px';
      newtext2.innerHTML = "Tile title.";
      var newelimina = document.createElement('a');
      newelimina.className+='nav-link';
      newelimina.href="#";
      var newi = document.createElement('i');
      newi.className+='fas';
      newi.className+=' fa-times';
      newelimina.appendChild(newi);
      newdiv3.appendChild(newtext2);
      newdiv3.appendChild(newtext);
      newdiv3.appendChild(newelimina);
      newdiv2.appendChild(newdiv3);
      //newdiv.appendChild(newdiv2);
      document.getElementById(cardcont).appendChild(newdiv2);
   }else if(cardcont[1]=="i"){  
      cardcont = cardcont[0];
      cardcont+='c';
      var newdiv2  = document.createElement('div');
   //   newdiv2.setAttribute('draggable', 'true')
      newdiv2.className+='card';
      newdiv2.className+=' box';
      newdiv2.style.width='18rem'
      var newdiv3  = document.createElement('div');
      newdiv3.className+='card-body';
      newdiv3.id='13';
      var newtext =document.createElement('textarea');
      newtext.setAttribute('spellcheck', 'false');
      newtext.innerHTML ="Some quick example text to build on the card title and make up the bulk of the card's content.";
      var newtext2 =document.createElement('textarea');
      newtext2.setAttribute('maxlength', '50');
      newtext2.setAttribute('spellcheck', 'false');
      newtext2.style.height='55px';
      newtext2.innerHTML = "Tile title.";
      var newinput =document.createElement('input');
      newinput.type="file";
      newinput.id="myFile";
      newinput.className+='dynamicElement';
      var newelimina = document.createElement('a');
      newelimina.className+='nav-link';
      newelimina.href="#";
      var newi = document.createElement('i');
      newi.className+='fas';
      newi.className+=' fa-times';
      var newimage = document.createElement('img');
      newimage.className+="card-img-top";
      newimage.src="";
      newelimina.appendChild(newi);
      newdiv3.appendChild(newtext2);
      newdiv3.appendChild(newtext);
      newdiv2.appendChild(newdiv3);
      newdiv2.appendChild(newinput);
      newdiv2.appendChild(newimage);
      newdiv2.appendChild(newelimina);
      //newdiv.appendChild(newdiv2);
      document.getElementById(cardcont).appendChild(newdiv2);
   }
   });
  });

$(document).on('click', '.fa-times', function(e) {
  var div_id = $(this).closest('.box').find('.card-body').attr('id');
  var pDoc = document.getElementById(div_id);
  parentDiv = pDoc.parentNode; //draggable
  parentDiv.parentNode.removeChild(parentDiv);
  
  $.ajax({
    url: "http://localhost:8080/deleteTile/"+ div_id,
    type: "DELETE",
    success: function(result){
       
    }
    
  })
  
  
});

$(document).on('click', '.el', function(e) {

  var div_id = $(this).closest('.board-list').attr('id');
  var pDoc = document.getElementById(div_id);
  parentDiv = pDoc.parentNode; //draggable
  parentDiv.removeChild(pDoc);
  var id_colonna=div_id+'';
  id_colonna=id_colonna.substring(0,id_colonna.length-1);

  $.ajax({
    url: "http://localhost:8080/delete/"+ id_colonna,
    type: "DELETE",
    success: function(result){
      
        window.location.reload();
    }
    
  })
 
  
});
//archivia colonna
$(document).on('click', '.ar', function(e) {

  var div_id = $(this).closest('.board-list').attr('id');
  var pDoc = document.getElementById(div_id);
  parentDiv = pDoc.parentNode; //draggable
  parentDiv.removeChild(pDoc);
  var id_colonna=div_id+'';
  id_colonna=id_colonna.substring(0,id_colonna.length-1);

  $.ajax({
    url: "http://localhost:8080/archivia/"+ id_colonna,
    type: "PUT",
    success: function(result){
       
    }
    
  })
 
  
});

$(document).on('change', '.myFile', function (e) {
  var textarea=document.createElement('textarea');
  textarea.id='aus';
  textarea.className+='hidden';

  var container=document.getElementById('cf');
  container.appendChild(textarea);

  var el=$(this).closest('.box').find('.card-body').find('.card-img-top').attr('id');
  global=el;

  el=document.getElementById(el);
  var x=$(this).closest('.box').find('.card-body').find('.card-img-top').attr('id');
  var reader;

  var idbutton=$(this).closest('.box').find('.card-body').find('button').attr('id');
  idbutton=document.getElementById(idbutton);
  var a=document.getElementById("aus");
  console.log(a);
  for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
    var file = e.originalEvent.srcElement.files[i];
    
    reader = new FileReader();
    reader.onloadend = function() {
      el.src= reader.result;
      a.innerHTML=reader.result;
    } 
  } 
    

    reader.readAsDataURL(file);
    var div_id = $(this).closest('.box').find('.card-body').attr('id');
    var app2  = document.getElementById(div_id);
  
    idbutton.classList.remove('hidden');
    
    

});



$(document).on('click', '.type', function(e) {

  var id = this.id;
  id+="";
  id=id.split("_")[2];
  if(id=='org'){
      var menu=$(this).closest('.board-list').find('.dragger').find('.box').find('.col-menu').attr('id');
      menu=document.getElementById(menu);
      var container=$(this).closest('.box').find('.container').find('.row').find('.cols').attr('id');
      container=document.getElementById(container);
      container.innerHTML="organizzativo";
      container.classList.remove('hidden');
      var div_id = $(this).closest('.board-list').attr('id');
      var div_id2 = $(this).closest('.box').find('.card-body').attr('id');
      var div_id3 = $(this).closest('.box').find('.col-menu').attr('id');
      div_id2=document.getElementById(div_id2);
      div_id3=document.getElementById(div_id3);
      div_id2.classList.remove("hidden");
      var text=this.id+'';
      text=text.split('_');
      var app=text[0]+'_'+text[1]+'_title';
      text=document.getElementById(app);
      text.select();
      var div_id4 = $(this).closest('.box').attr('id');
      div_id4=document.getElementById(div_id4);
      div_id4.classList.add('organizzativo');
      var x=$(this).closest('.card').attr('id');
      x=document.getElementById(x);
      x.removeChild(menu);
  }else{
    var menu=$(this).closest('.board-list').find('.dragger').find('.box').find('.col-menu').attr('id');
    menu=document.getElementById(menu);
    var container=$(this).closest('.box').find('.container').find('.row').find('.cols').attr('id');
    container=document.getElementById(container);
    container.innerHTML="informativo";
    container.classList.remove('hidden');
    var div_id = $(this).closest('.board-list').attr('id');
    var div_id2 = $(this).closest('.box').find('.card-body').attr('id');
    var div_id3 = $(this).closest('.box').find('.col-menu').attr('id');
    div_id2=document.getElementById(div_id2);
    div_id3=document.getElementById(div_id3);
    div_id2.classList.remove("hidden");
    var text=this.id+'';
    text=text.split('_');
    var app=text[0]+'_'+text[1]+'_title';
    text=document.getElementById(app);
    text.select();
    var div_id4 = $(this).closest('.box').attr('id');
    div_id4=document.getElementById(div_id4);
    div_id4.classList.add('informativo');
    var x=$(this).closest('.card').attr('id');
    x=document.getElementById(x);
    x.removeChild(menu);
  }
});

function printColonne(colonna,index){
  var newboard  = document.createElement('div');
  newboard.className+='board-list';
  newboard.id=colonna.id+'b'; //boardlist non serve id diverso
  var newlistmenu = document.createElement('div');
  newlistmenu.className+='list-title';
  newlistmenu.className+=' collapse';
  newlistmenu.className+=' navbar-collapse';
  var newtext =document.createElement('textarea');
  newtext.id=colonna.id+'_text';
  newtext.className+='real-colonne';
  newtext.setAttribute('spellcheck', 'false');
  newtext.innerHTML = colonna.titolo;
  var newul = document.createElement('ul');
  newul.className+='navbar-nav';
  newul.className+=' col-menu';
  var newli = document.createElement('li');
  newli.className+='nav-item';
  newli.className+=' dropdown';
  var newamenu = document.createElement('a');
  newamenu.className+='nav-link';
  newamenu.className+=' dropdown-toggle';
  newamenu.href="#";
  newamenu.id='navbarDropdownMenuLink';
  newamenu.setAttribute('data-toggle', 'dropdown');
  newamenu.setAttribute('aria-haspopup', 'true');
  newamenu.setAttribute('aria-expanded', 'false');
  var newi = document.createElement('i');
  newi.className+='fas';
  newi.className+=' fa-bars';
  var newdivmenu = document.createElement('div');
  newdivmenu.className+='dropdown-menu';
  newdivmenu.setAttribute('aria-labelledby','navbarDropdownMenuLink');
  var newae = document.createElement('a');
  newae.className+='dropdown-item';
  newae.className+=' el';
  newae.href="#";
  newae.innerHTML ="Elimina";
  var newaa = document.createElement('a');
  newaa.className+='dropdown-item';
  newaa.className+=' ar';
  newaa.href="#";
  newaa.innerHTML ="Archivia";
  var newdragger = document.createElement('div');
  newdragger.id=colonna.id+"d";
  newdragger.className+='dragger';
  var newdivcont = document.createElement('div');
  newdivcont.className+='container';
  var newbuttont = document.createElement('button');
  newbuttont.id = colonna.id+'t';
  newbuttont.type='button';
  newbuttont.className+='btn';
  newbuttont.className+=' btn-outline-primary';
  newbuttont.className+=' dyncol';
  newbuttont.className+=' add';
  newbuttont.innerHTML ="Add text tile";
  var newbuttoni = document.createElement('button');
  newbuttoni.id = colonna.id+'i';
  newbuttoni.type='button';
  newbuttoni.className+='btn';
  newbuttoni.className+=' btn-outline-primary';
  newbuttoni.className+=' dyncol';
  newbuttoni.className+=' add';
  newbuttoni.innerHTML ="Add image tile";
  var newbr = document.createElement('br');
  newdivcont.appendChild(newbuttont);
  newdivcont.appendChild(newbr);
  newdivcont.appendChild(newbuttoni);
  newamenu.appendChild(newi);
  newdivmenu.appendChild(newae);
  newdivmenu.appendChild(newaa);
  newli.appendChild(newamenu);
  newli.appendChild(newdivmenu);
  newul.appendChild(newli);
  newlistmenu.appendChild(newtext);
  newlistmenu.appendChild(newul);
  newboard.appendChild(newlistmenu);
  newboard.appendChild(newdragger);
  newboard.appendChild(newdivcont);
  document.getElementById('cf').appendChild(newboard);

  //Stampa dei tiles
 
  $.ajax({
    url: "http://localhost:8080/tileTestuale/"+colonna.id,
    type: "GET",
    success: function(result1){

      $.ajax({
        url: "http://localhost:8080/tileImg/"+colonna.id,
        type: "GET",
        success: function(result2){
          var x=result1.concat(result2);
          x=x.sort(compare);
          x.forEach(printTile);
        }
      })
          
          
    }
  })
  
function compare(a, b){//compare dei tiles
    a=a.id;
    b=b.id;
    var x=a.split("_")[1];
    var y=b.split("_")[1];
    x=parseInt(x);
    y=parseInt(y);
    if(x < y)
      return -1;
    if(x>y)
      return 1;

    return 0;
  }
  
}
function compareColonne(a, b){//compare delle colonne
  a=a.id;
  b=b.id;
  var x=parseInt(x);
  var y=parseInt(y);
  if(x < y)
    return -1;
  if(x>y)
    return 1;

  return 0;
}





function createOptions(colonna){
  var sel=document.getElementById(x);
  var newop2= newop2=document.createElement('option');
  newop2.value = colonna.id;
  newop2.text = colonna.titolo;
  sel.appendChild(newop2);
}

function printTile(tile,index){
    if(tile.type==="t"){
      var newdiv2  = document.createElement('div');
      newdiv2.id= tile.id+'_draggable';
      newdiv2.className+='card';
      newdiv2.className+=' box';
      newdiv2.className+=' '+tile.tipo_messaggio;
      newdiv2.style.width='18rem'
      var newdiv3  = document.createElement('div');
      newdiv3.id= tile.id+"_t";
      newdiv3.className+='card-body';

      var newdivcontainer=document.createElement('div');
      newdivcontainer.className+="container";
      var newdivc=document.createElement('div');
      newdivc.className+="row";
      var newdivcol=document.createElement('div');
      newdivcol.className+="col";
      var newdivcols=document.createElement('div');
      newdivcols.id=tile.id+"_cols";
      newdivcols.className+="cols";
      newdivcols.innerHTML=tile.tipo_messaggio;





      var newamenu = document.createElement('a');
      newamenu.className+='nav-link';
      newamenu.className+=' dropdown-toggle';
      newamenu.href="#";
      newamenu.id='navbarDropdownMenuLink';
      newamenu.setAttribute('data-toggle', 'dropdown');
      newamenu.setAttribute('aria-haspopup', 'true');
      newamenu.setAttribute('aria-expanded', 'false');

      var newi2 = document.createElement('i');
      newi2.className+='fas';
      newi2.className+=' fa-bars';

      var newdivmenu = document.createElement('div');
      newdivmenu.id=lastIDColonna+'_divmenu';
      newdivmenu.className+='dropdown-menu';
      newdivmenu.setAttribute('aria-labelledby','navbarDropdownMenuLink');

      
    
    

      var newtext =document.createElement('textarea');
      newtext.id= tile.id+'_text';
      newtext.className+='real-text-tile';
      newtext.setAttribute('spellcheck', 'false');
      newtext.innerHTML=tile.contenuto;
      


      var newtext2 =document.createElement('textarea');
      newtext2.id= tile.id+'_title';
      newtext2.className+='real-title-tile';
      newtext2.setAttribute('maxlength', '50');
      newtext2.setAttribute('spellcheck', 'false');
      newtext2.style.height='55px';
      newtext2.innerHTML=tile.titolo;
      var newelimina = document.createElement('a');
      newelimina.className+='nav-link';
      newelimina.href="#";
      var newi = document.createElement('i');
      newi.className+='fas';
      newi.className+=' fa-times';

      var newsel=document.createElement('select');
      newsel.id=tile.id+'_sel';
      newsel.className+='custom-select';

      var newop=document.createElement('option');
      newop.setAttribute('disabled',true);
      newop.setAttribute('selected',true);
      newop.innerHTML="Sposta in";
      newsel.appendChild(newop);
      $.ajax({
        url:"http://localhost:8080/colonne",
        type: "GET",
        success: function(data){
          data = data.filter(function(el) { 
            if(el.id!=tile.id_colonna)
              return el; 
          });
    
          data.forEach(function(colonna) {
            var sel = document.getElementById(newsel.id);
            var newop2 = document.createElement('option');
    
            newop2.value = colonna.id;
            newop2.text = colonna.titolo;
    
            sel.appendChild(newop2);
          })
        }
      })

     


      newdivcol.appendChild(newelimina);
      newdivc.appendChild(newdivcol);
      newdivc.appendChild(newdivcols);
      newdivcontainer.appendChild(newdivc);

      newamenu.appendChild(newi2);
      newelimina.appendChild(newi);
      newdiv3.appendChild(newtext2);
      newdiv3.appendChild(newtext);
     
      newdiv2.appendChild(newdiv3);
      newdiv2.appendChild(newdivcontainer);
      newdiv2.appendChild(newsel);
  

      var id_dragger= tile.id_colonna+'d';
     
      document.getElementById(id_dragger).appendChild(newdiv2);
      

    }else{//tile immagine
       var id_dragger;
       var source="";
      var newsel=document.createElement('select');
      newsel.id=tile.id+'_sel';
      newsel.className+='custom-select';

      var newop=document.createElement('option');
      newop.setAttribute('disabled',true);
      newop.setAttribute('selected',true);
      newop.innerHTML="Sposta in";
      newsel.appendChild(newop);
      $.ajax({
        url:"http://localhost:8080/colonne",
        type: "GET",
        success: function(data){
          data = data.filter(function(el) { 
            if(el.id!=tile.id_colonna)
              return el; 
          });
    
          data.forEach(function(colonna) {
            var sel = document.getElementById(newsel.id);
            var newop2 = document.createElement('option');
    
            newop2.value = colonna.id;
            newop2.text = colonna.titolo;
    
            sel.appendChild(newop2);
          })
        }
      })
      
      var newsalva = document.createElement('button');
      newsalva.id = tile.id+'_salva';
      newsalva.type='button';
      newsalva.className+='text';
      newsalva.className+=' btn';
      newsalva.className+=' btn-outline-primary';
      newsalva.className+=' hidden';
      newsalva.className+=' loaded';
      newsalva.innerHTML ="Salva immagine";
     
       
      
        var newdiv2  = document.createElement('div');
        newdiv2.id=tile.id+'_draggable';
       // newdiv2.setAttribute('draggable', 'true')
        newdiv2.className+='card';
        newdiv2.className+=' box';
        newdiv2.className+=' '+tile.tipo_messaggio;
        newdiv2.style.width='18rem';

        var newdiv3  = document.createElement('div');
        newdiv3.id=tile.id+"_i";
     
        newdiv3.className+='card-body';
        
        var newdivcontainer=document.createElement('div');
        newdivcontainer.className+="container";
        var newdivc=document.createElement('div');
        newdivc.className+="row";
        var newdivcol=document.createElement('div');
        newdivcol.className+="col";
        var newdivcols=document.createElement('div');
        newdivcols.id=tile.id+"_cols";
        newdivcols.className+="cols";
        newdivcols.innerHTML=tile.tipo_messaggio;
  

        var newtext2 =document.createElement('textarea');
        newtext2.id=tile.id+'_title';
        newtext2.className+='real-title-tile';
        newtext2.setAttribute('maxlength', '50');
        newtext2.setAttribute('spellcheck', 'false');
        newtext2.style.height='55px';
        newtext2.innerHTML=tile.titolo;
      

        var newinput =document.createElement('input');
        newinput.id= tile.id+"_input";
        newinput.type="file";
        newinput.className="myFile";
        newinput.className+=' dynamicElement';


        var newelimina = document.createElement('a');
        newelimina.className+='nav-link';
        newelimina.href="#";
        var newi = document.createElement('i');
        newi.className+='fas';
        newi.className+=' fa-times';
        var newimage = document.createElement('img');
        newimage.id=tile.id+'_image';
        newimage.className+="card-img-top";
        if(tile.immagine==null)
          newimage.src="";
        else
          newimage.src=tile.immagine;


       
        newdivcol.appendChild(newelimina);
        newdivc.appendChild(newdivcol);
        newdivc.appendChild(newdivcols);
        newdivcontainer.appendChild(newdivc);
        newelimina.appendChild(newi);
        newdiv3.appendChild(newtext2);
        newdiv2.appendChild(newdiv3);
       
       
        newdiv3.appendChild(newimage);
        newdiv3.appendChild(newinput);
        newdiv3.appendChild(newsalva);
        newdiv2.appendChild(newdivcontainer);
        newdiv2.appendChild(newsel);
      
        id_dragger=tile.id_colonna+'d';
        document.getElementById(id_dragger).appendChild(newdiv2);

    }
         

}






$(document).on('change', '.void-colonne', function(e) {
  var title=this.value;
  var empty=false;
  if (!title.replace(/\s/g, '').length) {
    empty=true;
  }
  var id_colonna=$(this).closest('.board-list').attr('id');
  id_colonna+='';
  id_colonna=id_colonna.substring(0,id_colonna.length-1);
  var newaa = document.createElement('a');
  newaa.className+='dropdown-item';
  newaa.className+=' ar';
  newaa.href="#";
  newaa.innerHTML ="Archivia";
  var newdivmenu=$(this).closest('.board-list').find('.list-title').find('.col-menu').find('.dropdown').find('.dropdown-menu').attr('id');
  newdivmenu=document.getElementById(newdivmenu);
  var x=document.getElementById(this.id);
  var buttoni=$(this).closest('.board-list').find('.container').find('.img').attr('id');
  buttoni=document.getElementById(buttoni);
  var buttont=$(this).closest('.board-list').find('.container').find('.text').attr('id');
  buttont=document.getElementById(buttont);
  if(!empty){
    title+='';
    title=title.replace(' ','_');
  }else{
    title="";
  }
  if(title.length>=1){
   
    $.get("http://localhost:8080/check/"+title, function(data){

         if(data==false){
                $.ajax({
                  url:"http://localhost:8080/aggiungi/"+title,
                  type: "POST",
                  success: function(result){
                    newdivmenu.appendChild(newaa);
                    buttoni.removeAttribute('disabled');
                    buttont.removeAttribute('disabled');
                    x.classList.remove('void-colonne');
                    x.classList.add('real-colonne');
                    window.location.reload();
                   
                    

                  }
                })
         }else{
           x.value="";
           alert("Titolo già presente");
          
           
         }

    });

            
  }else{
    alert("Non puoi inserire un titolo vuoto");
  }
});
var aus;
$(document).on('change', '.real-colonne', function(e) {
  var title=this.value;
  var empty=false;
  if (!title.replace(/\s/g, '').length) {
    empty=true;
  }
  var id_colonna=$(this).closest('.board-list').attr('id');
  id_colonna+='';
  id_colonna=id_colonna.substring(0,id_colonna.length-1);
  var x=document.getElementById(this.id);
  var y=this.value;
  if(!empty){
    title+='';
    title=title.replace(' ','_');
  }else{
    title="";
  }
  if(title.length>=1){
  
    $.get("http://localhost:8080/check/"+title, function(data){

         if(data==false){
              $.ajax({
                url:"http://localhost:8080/aggiorna/"+id_colonna+"/"+title,
                type: "PUT",
                success: function(result){
                 

                }
              })
          }else{
            x.value=aus;
            alert("Titolo già presente");
          }
    });
  }else{
   
    x.value=aus;
    alert("Non puoi inserire un titolo vuoto");
    
  }
});
$(document).on('click', '.real-colonne', function (e) {
  aus=this.value;

});


$(document).on('change', '.void-title-tile', function(e) {
 
  var title=this.value;
  var textarea=$(this).closest('.card-body').find('.void-text-tile').attr('id');
  textarea=document.getElementById(textarea);
  var text_title=document.getElementById(this.id);

  var id_colonna=$(this).closest('.card-body').attr('id');
  var tipo_tile=$(this).closest('.box').attr('id');
  tipo_tile=document.getElementById(tipo_tile);
  var tipologia;
  if(tipo_tile.classList.contains('informativo'))
      tipologia="informativo";
  else
    tipologia="organizzativo";
  id_colonna+='';
  //id_colonna=id_colonna.substring(0,id_colonna.length-1);
  var array=id_colonna.split('_');
  var id_tile=array[0]+'_'+array[1];
  var type=array[2];
  title=title.replace(' ','_');

  var inputimg=$(this).closest('.card-body').find('input').attr('id');
  inputimg=document.getElementById(inputimg);

  if(title.length>=1){
    $.ajax({
      url:"http://localhost:8080/aggiungiTile/"+id_tile+"/"+type+"/"+tipologia+"/"+title,
     // data: JSON.stringify({titolo:title}),
      type: "POST",
      success: function(result){
            if(result==true){
              if(type=="t")
                  textarea.removeAttribute('disabled');
              else
                inputimg.removeAttribute('disabled');
              
              
              text_title.classList.remove('void-title-tile');
              text_title.classList.add('real-title-tile');

            }

      }
    })


  }
});

$(document).on('change', '.real-title-tile', function(e) {
  var title=this.value;
  var textarea=$(this).closest('.card-body').find('.real-text-tile').attr('id');
  textarea=document.getElementById(textarea);
  var text_title=document.getElementById(this.id);
  var id_colonna=$(this).closest('.card-body').attr('id');
  var tipo_tile=$(this).closest('.box').attr('id');
  tipo_tile=document.getElementById(tipo_tile);
  var array=id_colonna.split('_');
  var id_tile=array[0]+'_'+array[1];
  id_colonna+='';
  title=title.replace(' ','_');
  if(title.length>=1){
      $.ajax({
        url:"http://localhost:8080/aggiornaTitoloTile/"+id_tile+"/"+title+"/"+array[2],
       // data: JSON.stringify({titolo:title}),
        type: "PUT",
        success: function(result){
              if(result==true){
               
  
              }
        }
      })
    

  }else{
    text_title.value=ausTitolo;
    alert("Il tile non deve essere vuoto");
  }
  
});

$(document).on('click', '.real-title-tile', function (e) {
  ausTitolo=this.value;

});

//contenuto tile 
$(document).on('change', '.void-text-tile', function(e) {
  var text=this.value;
  var textarea=$(this).closest('.card-body').find('.real-text-tile').attr('id');
  textarea=document.getElementById(textarea);
  var text_title=document.getElementById(this.id);
  var id_colonna=$(this).closest('.card-body').attr('id');
  var tipo_tile=$(this).closest('.box').attr('id');
  tipo_tile=document.getElementById(tipo_tile);
  var array=id_colonna.split('_');
  var id_tile=array[0]+'_'+array[1];
  id_colonna+='';
  text=text.replace(' ','_');
  if(text.length>=1){
      $.ajax({
        type: "PUT",
        url:"http://localhost:8080/aggiungiContenuto/"+id_tile+"/"+text,
        data: text,
        dataType: "text",
       contentType: "text/plain", //change
        
        success: function(result){
              
        }
      })
    

  }
  
});



$(document).on('click', '.loaded', function(e) {
  var textarea=document.getElementById('aus');
  var src=textarea.value;
  var id=this.id+'';
  var array=id.split('_');
  var id_tile=array[0]+'_'+array[1];
  var button=document.getElementById(this.id);
  var cf=document.getElementById('cf');
  var d = {};
  d["source"]=src;

  $.ajax({
    type : "PUT",
    url:"http://localhost:8080/aggiungiImg/"+id_tile,
    data: src,
    dataType: "text",
    contentType: "text/plain", 
    success: function(result){
              //if(result==true){
                button.classList.add('hidden');
                cf.removeChild(textarea);
              //}
             alert(result==true);
      
    }
  })
  window.location.reload();
});



