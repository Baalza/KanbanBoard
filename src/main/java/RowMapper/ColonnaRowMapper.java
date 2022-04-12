package RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import progetto.entities.Colonna;
 
public class ColonnaRowMapper implements RowMapper<Colonna> {
	
	@Override
	 public Colonna mapRow(ResultSet rs, int rowNum) throws SQLException {
		Colonna c=new Colonna();
        c.setId(rs.getInt("id"));
        c.setStato(rs.getString("stato"));
        c.setTitolo(rs.getString("titolo"));
        c.createTiles();
        return c;
    }
	

	

}
