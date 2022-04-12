package progetto.entities;

import javax.persistence.Entity;

import javax.persistence.Table;

@Entity
@Table(name="tile_testuale")
public class TileTestuale extends Tile{
	
	private String contenuto;
	
	public TileTestuale() {
		super();
	}
	

	public String getContenuto() {
		return contenuto;
	}
	public void setContenuto(String contenuto) {
		this.contenuto = contenuto;
	}
	
	

}
