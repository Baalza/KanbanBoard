package progetto.controller;

import javax.imageio.ImageIO;
import java.util.List;
import org.apache.commons.codec.binary.Base64OutputStream;
import org.imgscalr.Scalr;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.awt.image.BufferedImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import RowMapper.ColonnaRowMapper;
import RowMapper.TileImgRowMapper;
import RowMapper.TileTestualeRowMapper;
import progetto.entities.Colonna;
import progetto.entities.TileImg;
import progetto.entities.TileTestuale;



@RestController
public class SpringController {
	@Autowired
	private JdbcTemplate jdbc;

	/*Metodo che carica la pagina index*/

	@RequestMapping(method = RequestMethod.GET, value = "/")
	public String index() throws IOException, URISyntaxException {
		URL res = getClass().getClassLoader().getResource("index.html");
		File file = Paths.get(res.toURI()).toFile();
		String absolutePath = file.getAbsolutePath();
		BufferedReader reader = new BufferedReader(new FileReader(absolutePath));
		String line = null;
		StringBuilder stringBuilder = new StringBuilder();
		String ls = System.getProperty("line.separator");

		try {
			while ((line = reader.readLine()) != null) {
				stringBuilder.append(line);
				stringBuilder.append(ls);
			}

			return stringBuilder.toString();
		} finally {
			reader.close();
		}
	}

	/*Metodi di accesso, aggiornamento, rimozione della entity colonna*/
	@RequestMapping(method = RequestMethod.GET, value = "/check/{titolo}")
	public boolean isPresente(@PathVariable String titolo) {
		String sql = "select * from colonna where titolo=?";
		List<Colonna> colonne=jdbc.query(sql, new ColonnaRowMapper(), titolo);
		return colonne.size()>=1;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/aggiorna/{id}/{titolo}")
	public boolean aggiornaTitoloColonna(@PathVariable String id, @PathVariable String titolo) {
		int id_colonna=Integer.parseInt(id);
		String query="update colonna set titolo=?  where id=?";
		titolo=titolo.replace("_", " ");
		int row=jdbc.update(query,titolo, id_colonna);
		return row==1;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/colonne")
	public List<Colonna> getColonne() {
		String sql = "select * from colonna where stato='in_corso' order by id asc";
		List<Colonna> colonne = jdbc.query(sql, new ColonnaRowMapper());
		return colonne;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/colonneArchiviate")
	public List<Colonna> getColonneArchiviate() {
		String sql = "select * from colonna where stato='archiviato'";
		List<Colonna> colonne = jdbc.query(sql, new ColonnaRowMapper());
		return colonne;
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/{id}")
	public boolean deleteColonna(@PathVariable String id){
		int id_colonna=Integer.parseInt(id);
		String query="delete from colonna where id=?";
		int row=jdbc.update(query, new Object[] {id_colonna});
		return row==1;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/archivia/{id}")
	public boolean archiviaColonna(@PathVariable String id){
		int id_colonna=Integer.parseInt(id);
		String query="update colonna set stato='archiviato'  where id=?";
		int row=jdbc.update(query, id_colonna);
		return row==1;
	}

	@RequestMapping(method = RequestMethod.PUT, value = "/incorso/{id}")
	public boolean inCorsoColonna(@PathVariable String id){
		int id_colonna=Integer.parseInt(id);
		String query="update colonna set stato='in_corso'  where id=?";
		int row=jdbc.update(query, id_colonna);
		return row==1;
	}
	@RequestMapping(method = RequestMethod.POST, value = "/aggiungi/{titolo}")
	public boolean aggiungiColonna(@PathVariable String titolo){
		String titolo_colonna=titolo.replace("_", " ");
		String query="insert into colonna (titolo, stato) values (?, 'in_corso')";
		int row=jdbc.update(query, new Object[]{titolo_colonna});
		return row==1;
	}

	@RequestMapping(method = RequestMethod.GET, value = "/getLastID")
	public int getLastIDColonna(){
		String query="select * from colonna where stato='in_corso' order by id desc";
		List<Colonna> colonne = jdbc.query(query, new ColonnaRowMapper());
		int id=-1;
		if(colonne.size()>=1)
			id=colonne.get(0).getId();
		
		return id;
	}


	/*Metodi di accesso, aggiornamento, rimozione della entity tile*/
	@RequestMapping(method=RequestMethod.PUT, value="/aggiornaTitoloTile/{id}/{titolo}/{tipo}")
	public boolean aggiornaTitoloTile(@PathVariable String id, @PathVariable String titolo, @PathVariable String tipo){
		titolo=titolo.replace("_", " ");
		int row=0;
		String query="";
		if(tipo.equals("t")){// tile testuale
			query="update tile_testuale set titolo=?  where id=?";
			row=jdbc.update(query, titolo, id);
		}else{
			query="update tile_img set titolo=?  where id=?";
			row=jdbc.update(query, titolo, id);
		}
	
		return row==1;

	}
	@RequestMapping(method=RequestMethod.POST, value="/aggiungiTile/{id}/{tipo}/{tipologia}/{titolo}")
	public boolean aggiungiTile(@PathVariable String id,@PathVariable String tipo,@PathVariable String tipologia, @PathVariable String titolo){
		String sql="";
		titolo=titolo.replace('_', ' ');
		int row=0;
		String [] array=id.split("_");
		int id_colonna=Integer.parseInt(array[0]);
		if(tipo.equals("t")){ // tile testuale
			sql="insert into tile_testuale (id,id_colonna,titolo, autore,tipo_messaggio)"+
											"values (?, ?, ?, 'user', ?)";
			row=jdbc.update(sql, new Object[]{id, id_colonna,titolo, tipologia});
		}else{
			sql="insert into tile_img (id,id_colonna,titolo, autore, tipo_messaggio)"+
					"values (?, ?, ?, 'user', ?)";
			row=jdbc.update(sql, new Object[]{id, id_colonna,titolo, tipologia});
		}
		
		return row==1;
	}
	@RequestMapping(method=RequestMethod.PUT, value="/aggiungiContenuto/{id}/{text}")
	public  boolean aggiungiContenuto(@PathVariable String id, @PathVariable String text){
		String query="update tile_testuale set contenuto=?  where id=?";
		int row=jdbc.update(query, text, id);

		return row==1;
	}

	
	@RequestMapping(method=RequestMethod.PUT, value="/aggiungiImg/{id}")
	public boolean aggiungiImmagine(@PathVariable String id,@RequestBody String src){
		int maxDimension=900;
		String query="";
		int row=0;
		String base64Resized="";
		String base64Image = src.split(",")[1];
		byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
		System.out.println(src.substring(0,50));
		try {
			BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
			if(img.getWidth()>maxDimension || img.getHeight()>maxDimension){ 
				BufferedImage thumbnail = Scalr.resize(img, 900); //immagine ridimensionata
				/*File outputfile = new File("foo"+id+".jpg");   creazione delle immagine nella directory del progetto
				ImageIO.write(thumbnail, "jpg", outputfile);/*/

				//ottengo base64 dell' immagine ridimensionata
				ByteArrayOutputStream os = new ByteArrayOutputStream();
				OutputStream b64 = new Base64OutputStream(os);
				ImageIO.write(thumbnail, "jpg", b64);
				base64Resized= "data:image/png;base64,"+os.toString("UTF-8");//base 64 del file ridimensionato
				//carico nel db
				query="update tile_img set immagine=?  where id=?";
				row=jdbc.update(query, base64Resized, id);
			}else{
				query="update tile_img set immagine=?  where id=?";
				row=jdbc.update(query, src, id);
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}

		return row==1;

	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/deleteTile/{id}")
	public boolean rimuoviTile(@PathVariable String id){
		String id_tile=id.substring(0,id.length()-2);
		String tipo=id.split("_")[2];
		String query="";
		int row=0;
		if(tipo.equals("t")){
			query="delete from tile_testuale where id=?";
			row=jdbc.update(query, new Object[]{id_tile});
		}else
			if(tipo.equals("i")){
				query="delete from tile_img where id=?";
				row=jdbc.update(query, new Object[]{id_tile});
			}
		
		return row==1;
	}



	@RequestMapping(method=RequestMethod.GET, value="/tileTestuale/{id}")
	public List<TileTestuale> getTilesTestuale(@PathVariable String id){
		int id_colonna=Integer.parseInt(id);
		String sql="SELECT t.* from colonna as c inner join tile_testuale t on c.id = t.id_colonna where t.id_colonna=?";
		List<TileTestuale> tiles=jdbc.query(sql,new TileTestualeRowMapper(), id_colonna);
		for (TileTestuale t : tiles) {
			t.setType("t");
		}
		return tiles;
	}


	@RequestMapping(method=RequestMethod.GET, value="/tileImg/{id}")
	public List<TileImg> getTilesImmagine(@PathVariable String id){
		int id_colonna=Integer.parseInt(id);
		String sql="SELECT t.* from colonna as c inner join tile_img t on c.id = t.id_colonna where t.id_colonna=?";
		List<TileImg> tiles=jdbc.query(sql,new TileImgRowMapper(), id_colonna);
		return tiles;
	}

	@RequestMapping(method=RequestMethod.POST, value="/spostaTile/{id_tile}/{tipo}/{colonnaNuova}")
	public boolean spostaTile(@PathVariable String id_tile, @PathVariable String tipo, @PathVariable String colonnaNuova){
		int id_colonna_nuova=Integer.parseInt(colonnaNuova.split("_")[0]);
		String query="";
		int row=0;
		List<TileTestuale> tilesT;
		TileTestuale t=null;
		List<TileImg> tilesImg;
		TileImg i=null;
		
		if(tipo.equals("t")){
			query="SELECT t.* from colonna as c inner join tile_testuale t on c.id = t.id_colonna where t.id=?";
			tilesT=jdbc.query(query,new TileTestualeRowMapper(), id_tile);
			if(tilesT.size()>=1){
				t=tilesT.get(0);
				query="delete from tile_testuale where id=?";
				row=jdbc.update(query, new Object[]{id_tile});
				if(t!=null  && i==null){ // tile testuale
					query="insert into tile_testuale (id,id_colonna,titolo, autore, contenuto, tipo_messaggio)"+
												"values (?, ?, ?, 'user', ?, ?)";
					row=jdbc.update(query, new Object[]{colonnaNuova, id_colonna_nuova,t.getTitolo(), t.getContenuto(), t.getTipo_messaggio()});
				}
			}
				

		}else{
			query="SELECT t.* from colonna as c inner join tile_img t on c.id = t.id_colonna where t.id=?";
			tilesImg=jdbc.query(query, new TileImgRowMapper(),id_tile);
			if(tilesImg.size()>=1){
				i=tilesImg.get(0);
				query="delete from tile_img where id=?";
				row=jdbc.update(query, new Object[]{id_tile});
				if(i!=null && t==null){
					query="insert into tile_img (id,id_colonna,titolo, autore, immagine, tipo_messaggio)"+
					"values (?, ?, ?, 'user', ?, ?)";
					row=jdbc.update(query, new Object[]{colonnaNuova, id_colonna_nuova,i.getTitolo(), i.getImmagine(), i.getTipo_messaggio()});
			}
			}	
		}
		return row==1;

	}


	




	

}
