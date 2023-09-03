CREATE VIEW top_2_hits_do_momento AS
SELECT s.songs_name AS cancao, COUNT(*) AS reproducoes
FROM SpotifyClone.songs_heard AS sh
INNER JOIN SpotifyClone.songs AS s ON s.song_id = sh.song_id 
GROUP BY s.song_id
ORDER BY reproducoes DESC, cancao ASC LIMIT 2;
