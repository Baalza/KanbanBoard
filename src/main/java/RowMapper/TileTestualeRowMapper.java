package RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import progetto.entities.TileTestuale;

public class TileTestualeRowMapper implements RowMapper<TileTestuale>{

	
	@Override
	public TileTestuale mapRow(ResultSet rs, int rowNum) throws SQLException {
		TileTestuale t=new TileTestuale();
		t.setId(rs.getString("id"));
		t.setAutore(rs.getString("autore"));
		t.setTitolo(rs.getString("titolo"));
		t.setId_colonna(rs.getInt("id_colonna"));
		t.setContenuto(rs.getString("contenuto"));
		t.setTipo_messaggio(rs.getString("tipo_messaggio"));
		
		return t;
	}
	

}
