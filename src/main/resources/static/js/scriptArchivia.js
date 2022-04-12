
$(document).ready( function(){

    $.get("http://localhost:8080/colonneArchiviate", function(data){
        data.forEach(printColonne);

    });
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
    newtext.setAttribute('disabled',true);
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
   
  
    var newaa = document.createElement('a');
    newaa.className+='dropdown-item';
    newaa.className+=' corso';
    newaa.href="#";
    newaa.innerHTML ="Sposta in corso";
   
    var newdragger = document.createElement('div');
    newdragger.id=colonna.id+"d";
    newdragger.className+='dragger';
   
    var newdivcont = document.createElement('div');
    newdivcont.className+='container';
    
    
  

  
    newamenu.appendChild(newi);
  

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
  
    //PRINTARE I TILES
   
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
           // x.forEach(prova);
            x.forEach(printTile);
          }
        })
            
            
      }
    })
    
  function compare(a, b){
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
  
  function printTile(tile,index){
      if(tile.type==="t"){
       
        
        var newdiv2  = document.createElement('div');
        newdiv2.id= tile.id+'_draggable';
        newdiv2.setAttribute('draggable', 'true')
        newdiv2.className+='card';
        newdiv2.className+=' box';
        newdiv2.className+=' '+tile.tipo_messaggio;
        newdiv2.style.width='18rem'
        var newdiv3  = document.createElement('div');
        newdiv3.id= tile.id+"_t";
        newdiv3.className+=' card-body';
  
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
  
  
  
        
      
      
  
        var newtext =document.createElement('textarea');
        newtext.id= tile.id+'_text';
        newtext.className+='real-text-tile';
        newtext.setAttribute('spellcheck', 'false');
        newtext.setAttribute('disabled',true);
        newtext.innerHTML=tile.contenuto;
        
  
  
        var newtext2 =document.createElement('textarea');
        newtext2.id= tile.id+'_title';
        newtext2.className+='real-title-tile';
        newtext2.setAttribute('maxlength', '50');
        newtext2.setAttribute('spellcheck', 'false');
        newtext2.style.height='55px';
        newtext2.innerHTML=tile.titolo;
        newtext2.setAttribute('disabled',true);
        
  
      
        newdivc.appendChild(newdivcol);
        newdivc.appendChild(newdivcols);
        newdivcontainer.appendChild(newdivc);
        newdiv3.appendChild(newtext2);
        newdiv3.appendChild(newtext);
        newdiv2.appendChild(newdiv3);
        newdiv2.appendChild(newdivcontainer);

        var id_dragger= tile.id_colonna+'d';
        document.getElementById(id_dragger).appendChild(newdiv2);
        
  
      }else{//tile immagine
        var id_dragger;
        var source="";
    
        var newdiv2  = document.createElement('div');
        newdiv2.id=tile.id+'_draggable';
        newdiv2.setAttribute('draggable', 'true')
        newdiv2.className+='card';
        newdiv2.className+=' box';
        newdiv2.className+=' '+tile.tipo_messaggio;
        newdiv2.style.width='18rem';

        var newdiv3  = document.createElement('div');
        newdiv3.id=tile.id+"_i";
    
        newdiv3.className+=' card-body';
        
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
        newtext2.setAttribute('disabled',true);
        newtext2.style.height='55px';
        newtext2.innerHTML=tile.titolo;

        var newimage = document.createElement('img');
        newimage.id=tile.id+'_image';
        newimage.className+="card-img-top";
        newimage.src=tile.immagine

        newdivc.appendChild(newdivcol);
        newdivc.appendChild(newdivcols);
        newdivcontainer.appendChild(newdivc);
    
        newdiv3.appendChild(newtext2);
        newdiv2.appendChild(newdiv3);
        newdiv3.appendChild(newimage);
        newdiv2.appendChild(newdivcontainer);
        id_dragger=tile.id_colonna+'d';
        document.getElementById(id_dragger).appendChild(newdiv2);
  
      }
           
  
  }


  //sposta in corso
  $(document).on('click', '.corso', function(e) {
    
  var div_id = $(this).closest('.board-list').attr('id');
  var pDoc = document.getElementById(div_id);
  parentDiv = pDoc.parentNode; //draggable
  parentDiv.removeChild(pDoc);
  var id_colonna=div_id+'';
  id_colonna=id_colonna.substring(0,id_colonna.length-1);

  $.ajax({
    url: "http://localhost:8080/incorso/"+ id_colonna,
    type: "PUT",
    success: function(result){
        console.log("colonna in corso");
    }
    
  })

  });