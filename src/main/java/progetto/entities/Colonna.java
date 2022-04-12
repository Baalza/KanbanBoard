
package progetto.entities;
import java.util.ArrayList;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="colonna")
public class Colonna {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String titolo;
	private String stato;
	@OneToMany(mappedBy="colonna", fetch = FetchType.LAZY)
	private List<Tile> tiles;
	
	public void createTiles() {
		tiles=new ArrayList<Tile>();
	}
	public Integer getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitolo() {
		return titolo;
	}
	public void setTitolo(String titolo) {
		this.titolo = titolo;
	}
	public String getStato() {
		return stato;
	}
	public void setStato(String stato) {
		this.stato = stato;
	}
	@Override
	public String toString() {
		return "Colonna [id=" + id + ", titolo=" + titolo + ", stato=" + stato + "]";
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!(obj instanceof Colonna))
			return false;
		Colonna other = (Colonna) obj;
		if (id != other.id)
			return false;
		return true;
	}
}

