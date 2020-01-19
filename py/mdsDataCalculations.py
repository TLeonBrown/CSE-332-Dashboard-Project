# REQUIRES SCIKIT-LEARN TO WORK PROPERLY.
import csv
from sklearn.manifold import MDS


# Rank, Year, Runtime, Rating, Votes, Revenue, Metascore
data = []
goodData = []

# Read data from CSV, remove the colulmn titles.
with open('../data/IMDB-Movie-Data.csv') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        data.append(row)
data.pop(0)

# Format data properly.
temp = ["", "", "", "", "", "", ""]
for x in range(0, len(data)):
	temp[0] = data[x][0]
	temp[1] = data[x][6]
	temp[2] = data[x][7]
	temp[3] = data[x][8]
	temp[4] = data[x][9]
	temp[5] = data[x][10]
	temp[6] = data[x][11]
	goodData.append(temp)
	temp = ["", "", "", "", "", "", ""]

# Turn data into floats for calculations.
for x in range(0, len(goodData)):
	for y in range(0, len(goodData)):
		goodData[x] = [float(i) for i in goodData[x]]
		goodData[y] = [float(i) for i in goodData[y]]

# Normalize data.
for x in range (0, len(goodData)):
	goodData[x][0] /= 10 # Rank = Rank / 10
	goodData[x][1] -= 2006 # Year, 2006-2016, 2006 = 0
	goodData[x][4] /= 10000 # Votes = Votes / 10,000

# print(goodData)

# Do the MDS calculations.
result = MDS()
distances = result.fit_transform(goodData)

# Export to CSV.
with open('../data/MDS_Data_Distances.csv', 'w') as output:
    writer = csv.writer(output)
    writer.writerows(distances)
print('Created CSV file!')