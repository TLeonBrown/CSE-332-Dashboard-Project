# REQUIRES SCIPY TO WORK PROPERLY.
import csv
from scipy.stats.stats import pearsonr

data = []
# Rank, Year, Runtime, Rating, Votes, Revenue, Metascore
goodData = []
correlations = []

with open('../data/IMDB-Movie-Data.csv') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        data.append(row)

temp = []
for x in range(1, len(data)):
	temp.append(data[x][0])
goodData.append(temp)

temp = []
for y in range(6, 12):
	for x in range(1, len(data)):
		temp.append(data[x][y])
	goodData.append(temp)
	temp = []

for x in range(0, len(goodData)):
	for y in range(0, len(goodData)):
		goodData[x] = [float(i) for i in goodData[x]]
		goodData[y] = [float(i) for i in goodData[y]]

		correlations.append(pearsonr(goodData[x], goodData[y]))

for x in range(0, len(correlations)):
	if (correlations[x][0] > 0.9999):
		correlations[x][0] == 1.0
	correlations[x] = correlations[x][0]
	correlations[x] = float(correlations[x])
	correlations[x] = [correlations[x]]

with open('../data/correlations.csv', 'w') as output:
    writer = csv.writer(output)
    writer.writerows(correlations)

print('Created CSV file!')

