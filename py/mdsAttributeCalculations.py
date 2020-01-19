# REQUIRES SCIPY AND SCIKIT-LEARN TO WORK PROPERLY.
import csv
from scipy.stats.stats import pearsonr
from sklearn.manifold import MDS

# Function to split array into X equal parts.
def subdivideArray(array, splitSize):
    last = 0.0
    newList = []
    average = len(array)/float(splitSize)
    while last < len(array):
        newList.append(array[int(last) : int(last + average)])
        last += average
    return newList


# Rank, Year, Runtime, Rating, Votes, Revenue, Metascore
data = []
goodData = []
correlations = []

# Read data from CSV.
with open('../data/IMDB-Movie-Data.csv') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        data.append(row)

# Format data properly.
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

# Compute the correlation distance (1 - |correlation|)
for x in range(0, len(correlations)):
	correlations[x] = 1 - abs(correlations[x])

correlations = subdivideArray(correlations, 7)

# Do the MDS calculations.
result = MDS()
distances = result.fit_transform(correlations)

# Export to CSV.
with open('../data/MDS_Attribute_Distances.csv', 'w') as output:
    writer = csv.writer(output)
    writer.writerows(distances)
print('Created CSV file!')