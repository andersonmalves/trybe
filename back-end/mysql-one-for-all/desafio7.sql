CREATE VIEW perfil_artistas AS
SELECT
  art.artist_name AS artista, alb.album_name as album, COUNT(*) AS seguidores
FROM SpotifyClone.user_artist AS ua
  INNER JOIN SpotifyClone.artists AS art ON ua.artist_id = art.artist_id
  INNER JOIN SpotifyClone.album AS alb ON alb.artist_id = art.artist_id
GROUP BY alb.album_id
ORDER BY seguidores DESC, artista, album;
