DELIMITER $$
CREATE FUNCTION quantidade_musicas_no_historico(id INT)
RETURNS INT READS SQL DATA
BEGIN
DECLARE qtd INT;
SELECT COUNT(h.user_id) AS a
FROM SpotifyClone.songs_heard AS h
WHERE h.user_id = id
INTO qtd;
RETURN qtd;
END $$
DELIMITER ;
