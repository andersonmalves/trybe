DELIMITER $$
CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario (email VARCHAR(225))
  RETURNS INT READS SQL DATA
BEGIN
DECLARE jobHistory INT;
SELECT COUNT(*)
FROM hr.job_history AS jh
INNER JOIN hr.employees AS e
ON jh.EMPLOYEE_ID = e.EMPLOYEE_ID
WHERE e.EMAIL = email
INTO jobHistory;
RETURN jobHistory;
END $$
DELIMITER ;

-- SELECT buscar_quantidade_de_empregos_por_funcionario('NKOCHHAR');
