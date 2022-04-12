package RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import progetto.entities.TileImg;

public class TileImgRowMapper implements RowMapper<TileImg>{

	@Override
	public TileImg mapRow(ResultSet rs, int rowNum) throws SQLException {
		TileImg t=new TileImg();
		t.setId(rs.getString("id"));
		t.setAutore(rs.getString("autore"));
		t.setTitolo(rs.getString("titolo"));
		t.setId_colonna(rs.getInt("id_colonna"));
		t.setImmagine(rs.getString("immagine"));
		t.setTipo_messaggio(rs.getString("tipo_messaggio"));
		return t;
	}

}
