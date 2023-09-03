DELIMITER $$
CREATE TRIGGER trigger_usuario_delete
BEFORE DELETE ON SpotifyClone.user
FOR EACH ROW
BEGIN
DELETE FROM SpotifyClone.songs_heard
  WHERE user_id = OLD.user_id;
DELETE FROM SpotifyClone.user_artist
  WHERE user_id = OLD.user_id;
END $$
DELIMITER ;
