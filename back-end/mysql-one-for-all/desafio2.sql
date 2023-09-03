CREATE VIEW estatisticas_musicais AS
SELECT COUNT(song_id) AS cancoes, COUNT(DISTINCT(art.artist_id)) AS artistas, COUNT(DISTINCT(alb.album_id)) AS albuns
FROM SpotifyClone.songs AS s
INNER JOIN SpotifyClone.album AS alb ON s.album_id = alb.album_id 
INNER JOIN SpotifyClone.artists AS art ON alb.artist_id = art.artist_id;
