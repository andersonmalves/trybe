SELECT job_title  AS Cargo, ROUND(AVG(salary), 2) AS 'Média salarial',
  CASE
    WHEN AVG(salary) BETWEEN 2000 AND 5800 THEN 'Júnior'
    WHEN AVG(salary) BETWEEN 5801 AND 7500 THEN 'Pleno'
    WHEN AVG(salary) BETWEEN 7501 AND 10500 THEN 'Sênior'
    WHEN AVG(salary) > 10500 THEN 'CEO'
  END AS 'Senioridade'
FROM hr.jobs, hr.employees WHERE hr.jobs.JOB_ID = hr.employees.JOB_ID
GROUP BY Cargo
ORDER BY `Média salarial`, Cargo;
