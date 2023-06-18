SELECT * FROM PortfoliProject..CovidDeaths
ORDER BY 3,4

--SELECT * FROM PortfoliProject..CovidVaccinations
--ORDER BY 3,4

SELECT location, date, total_cases, new_cases, total_deaths, population
FROM PortfoliProject..CovidDeaths
ORDER BY 1,2



SELECT * FROM CovidDeaths

--ALTER TABLE CovidDeaths
--ALTER COLUMN total_cases float

--ALTER TABLE CovidDeaths
--ALTER COLUMN total_deaths float

--Looking at Total Cases vs Total Deaths

SELECT location, date, total_cases, total_deaths, (total_deaths/total_cases)*100 AS mortality_rate
FROM PortfoliProject..CovidDeaths
WHERE location like 'India'
ORDER BY 1,2
-- The mortality_rate of India seems to be low compared to the other countries

--Looking at Total Cases vs Population
SELECT location, date, total_cases,population, (total_cases/population)*100 AS cases_percentage
FROM PortfoliProject..CovidDeaths
WHERE location like 'India' AND total_cases is not NULL
ORDER BY 1,2

--Looking at countries with highest infection rate compared to population
SELECT location, population,MAX(total_cases) as HighestCount, MAX((total_cases/population))*100 AS PercentPopulationInfected
FROM PortfoliProject..CovidDeaths
--WHERE location like 'India' AND total_cases is not NULL
GROUP BY location, population
ORDER BY PercentPopulationInfected DESC
--Cyprus has the highest infection rate with 73%


--Looking at countries with highest death compared to population
SELECT location, population,MAX(total_cases) as HighestCount, MAX(total_deaths) as HighestDeathCount,
MAX((total_cases/population))*100 AS PercentPopulationInfected,
MAX((total_deaths/population))*100 AS PercentPopulationDeaths
FROM PortfoliProject..CovidDeaths
--WHERE location like 'India' AND total_cases is not NULL
GROUP BY location, population
ORDER BY PercentPopulationDeaths DESC
--Peru has the highest death rate copmpared to population with 0.64%

--The data for India is
SELECT location, population,MAX(total_cases) as HighestCount, MAX(total_deaths) as HighestDeathCount,
MAX((total_cases/population))*100 AS PercentPopulationInfected,
MAX((total_deaths/population))*100 AS PercentPopulationDeaths
FROM PortfoliProject..CovidDeaths
--WHERE location like 'India' AND total_cases is not NULL
GROUP BY location, population
HAVING location like 'India'
--India has high infection rate (3.17%) but very low death rate(0.03%)

--For Asia Continent
SELECT location, population,MAX(total_cases) as HighestCount, MAX(total_deaths) as HighestDeathCount,
MAX((total_cases/population))*100 AS PercentPopulationInfected,
MAX((total_deaths/population))*100 AS PercentPopulationDeaths
FROM PortfoliProject..CovidDeaths
--WHERE location like 'India' AND total_cases is not NULL
WHERE continent like 'Asia'
GROUP BY location, population
ORDER BY PercentPopulationDeaths DESC
--Georgia has the highest population deaths in Asia

--Let's break down by continent
SELECT continent, MAX(total_deaths) as TotalDeathCount 
FROM PortfoliProject..CovidDeaths
WHERE continent is not NULL
GROUP BY continent
ORDER BY TotalDeathCount DESC
--North America has the highest deaths followed by south america

--Let's find out the day with highest no of cases in India
SELECT date, MAX(new_cases) as HighestCases
FROM PortfoliProject..CovidDeaths
WHERE location like 'India'
GROUP BY date
ORDER BY HighestCases DESC
-- ON 7th JUNE 2021 India recorded highest no of cases equal to 4,14,188

--Let's find out the day with highest no of deaths in India
SELECT date, MAX(new_deaths) as HighestDeaths
FROM PortfoliProject..CovidDeaths
WHERE location like 'India'
GROUP BY date
ORDER BY HighestDeaths DESC
-- ON 10th JUNE 2021 India recorded highest no of cases equal to 6148

--Now movinf to CovidVaccinations data

SELECT * FROM PortfoliProject..CovidVaccinations

--Joining both tables

SELECT *
FROM PortfoliProject..CovidDeaths dea
JOIN PortfoliProject..CovidVaccinations vac
ON dea.location = vac.location AND dea.date = vac. date

--Looking at Total Populations vs Vaccinations
SELECT dea.continent, dea.location, dea.date, dea.population, vac.new_vaccinations,
SUM(CONVERT(bigint, vac.new_vaccinations)) OVER (PARTITION BY dea.location order by dea.location,
dea.date) as PeopleVaccinated
FROM PortfoliProject..CovidDeaths dea
JOIN PortfoliProject..CovidVaccinations vac
ON dea.location = vac.location AND dea.date = vac. date
WHERE dea.continent is not NULL
ORDER BY 2,3

--USING CTE To calculate further with PeopleVaccinated column
WITH PopVSVac (Continent, location, date, population, new_vaccinations, PeopleVaccinated)
AS
(
SELECT dea.continent, dea.location, dea.date, dea.population, vac.new_vaccinations,
SUM(CONVERT(bigint, vac.new_vaccinations)) OVER (PARTITION BY dea.location order by dea.location,
dea.date) as PeopleVaccinated
FROM PortfoliProject..CovidDeaths dea
JOIN PortfoliProject..CovidVaccinations vac
ON dea.location = vac.location AND dea.date = vac. date
WHERE dea.continent is not NULL
)
SELECT *, (PeopleVaccinated/population)*100 as PopVaccinated 
FROM PopVSVac

--Lets do it for India but using temp table
DROP TABLE IF exists #PopVSVacIND
CREATE TABLE #PopVSVacIND
(continent nvarchar(250), location nvarchar(250),
date datetime, population numeric,
new_vaccinations numeric, PeopleVaccinated numeric)

INSERT INTO #PopVSVacIND
SELECT dea.continent, dea.location, dea.date, dea.population, vac.new_vaccinations,
SUM(CONVERT(bigint, vac.new_vaccinations)) OVER (PARTITION BY dea.location order by dea.location,
dea.date) as PeopleVaccinated
FROM PortfoliProject..CovidDeaths dea
JOIN PortfoliProject..CovidVaccinations vac
ON dea.location = vac.location AND dea.date = vac. date
WHERE dea.continent is not NULL
AND dea.location like 'India'

SELECT *, (PeopleVaccinated/population)*100 as PopVaccinated 
FROM #PopVSVacIND
ORDER BY PopVaccinated DESC

--THe percentage comes out to be 149% which states many people have already gone through the double dose
--as of 16th JUNE 2023


--CREATING A VIEW to store data for later visualisation
CREATE VIEW PercentPeopleVaccinated AS
SELECT dea.continent, dea.location, dea.date, dea.population, vac.new_vaccinations,
SUM(CONVERT(bigint, vac.new_vaccinations)) OVER (PARTITION BY dea.location order by dea.location,
dea.date) as PeopleVaccinated
FROM PortfoliProject..CovidDeaths dea
JOIN PortfoliProject..CovidVaccinations vac
ON dea.location = vac.location AND dea.date = vac. date
WHERE dea.continent is not NULL
