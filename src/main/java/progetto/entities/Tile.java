package progetto.entities;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


public abstract class Tile {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private String id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="colonna_id")
	private int id_colonna;
	
	private String titolo;
	private String autore;
	private String tipo_messaggio;
	private String type;
	
	public Tile() {
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTipo_messaggio() {
		return tipo_messaggio;
	}

	public void setTipo_messaggio(String tipo_messaggio) {
		this.tipo_messaggio = tipo_messaggio;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getId_colonna() {
		return id_colonna;
	}
	public void setId_colonna(int id_colonna) {
		this.id_colonna = id_colonna;
	}
	public String getTitolo() {
		return titolo;
	}
	public void setTitolo(String titolo) {
		this.titolo = titolo;
	}
	public String getAutore() {
		return autore;
	}
	public void setAutore(String autore) {
		this.autore = autore;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!(obj instanceof Tile))
			return false;
		Tile other = (Tile) obj;
		if (autore == null) {
			if (other.autore != null)
				return false;
		} else if (!autore.equals(other.autore))
			return false;
		return true;
	}
	
	

}
