SELECT a.ContactName AS Nome, a.Country AS País, (COUNT(*) - 1) AS 'Número de compatriotas'
FROM w3schools.customers AS a, w3schools.customers AS b
	WHERE a.Country = b.Country
GROUP BY a.ContactName, a.Country HAVING (COUNT(*) - 1) > 0
ORDER BY a.ContactName;
