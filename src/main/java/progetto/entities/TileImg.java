package progetto.entities;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="tile_img")
public class TileImg extends Tile{
	
	private String immagine;

	public TileImg() {
		super();
		
	}

	public String getImmagine() {
		return immagine;
	}

	public void setImmagine(String immagine) {
		this.immagine = immagine;
	}

	
	
	
	

}
