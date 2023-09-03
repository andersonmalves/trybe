CREATE VIEW historico_reproducao_usuarios AS
  SELECT usuario.username AS usuario, cancoes.songs_name AS nome
    FROM SpotifyClone.user AS usuario
    INNER JOIN SpotifyClone.songs_heard AS historico ON usuario.user_id = historico.user_id
    INNER JOIN SpotifyClone.songs AS cancoes ON cancoes.song_id = historico.song_id
    ORDER BY usuario ASC, nome ASC;
