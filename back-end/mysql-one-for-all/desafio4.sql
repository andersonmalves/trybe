CREATE VIEW top_3_artistas AS
SELECT a.artist_name AS artista, COUNT(*) AS seguidores
FROM SpotifyClone.user_artist AS ua
INNER JOIN SpotifyClone.artists AS a ON ua.artist_id = a.artist_id
GROUP BY a.artist_id
ORDER BY seguidores DESC, artista ASC LIMIT 3;
