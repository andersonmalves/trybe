DELIMITER $$
CREATE PROCEDURE albuns_do_artista(IN nome VARCHAR(50))
BEGIN
SELECT art.artist_name AS artista, alb.album_name AS album
FROM SpotifyClone.artists AS art
JOIN SpotifyClone.album AS alb
ON art.artist_id = alb.artist_id
WHERE art.artist_name = nome
ORDER BY album ASC;
END $$
DELIMITER ;
