import csv
import pandas as pd
import numpy as np

# Calculate values in percent.
# The percent is "how many percent of the age group died from this cause"

# IN AND OUTPUT NAMES
# dead4
# finaldeadvsAlive

df = pd.read_csv('dead4.csv', delimiter = ';') 
df2 = pd.read_excel('BE0101N1.xlsx') 
# print (df2['1997'][100])

# For every year, calculate total number of death per 100 000 in every age group
# Then divide every row's value with the corrseponding age group's total ppl

# total = # vector with 18 rows and 1997-2018 columns


for year in range(1997, 2019):
	for age in range(0, 101):
		if age == 0:
			index = [0, 1, 2, 3, 4]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][0] = tmp
			# print(df2[str(year)][0])
		elif age == 5:
			index = [5, 6, 7, 8, 9]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][1] = tmp
		elif age == 10:
			index = [10, 11, 12, 13, 14]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][2] = tmp
		elif age == 15:
			index = [15, 16, 17, 18, 19]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][3] = tmp
		elif age == 20:
			index = [20, 21, 22, 23, 24]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][4] = tmp
		elif age == 25:
			index = [25, 26, 27, 28, 29]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][5] = tmp
		elif age == 30:
			index = [30, 31, 32, 33, 34]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][6] = tmp
		elif age == 35:
			index = [35, 36, 37, 38, 39]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][7] = tmp
		elif age == 40:
			index = [40, 41, 42, 43, 44]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][8] = tmp
		elif age == 45:
			index = [45, 46, 47, 48, 49]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][9] = tmp
		elif age == 50:
			index = [50, 51, 52, 53, 54]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][10] = tmp
		elif age == 55:
			index = [55, 56, 57, 58, 59]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][11] = tmp
		elif age == 60:
			index = [60, 61, 62, 63, 64]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][12] = tmp
		elif age == 65:
			index = [65, 66, 67, 68, 69]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][13] = tmp
		elif age == 70:
			index = [70, 71, 72, 73, 74]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][14] = tmp
		elif age == 75:
			index = [75, 76, 77, 78, 79]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][15] = tmp
		elif age == 80:
			index = [80, 81, 82, 83, 84]
			tmp = df2[str(year)][index].sum()
			df2[str(year)][16] = tmp
		elif age == 85:
			index = list(range(85, 101))
			tmp = df2[str(year)][index].sum()
			df2[str(year)][17] = tmp


		
	



for year in range(1997, 2019):
    rows = df.loc[df['År'] == year]       # All rows within one year

    for age in range(1,19):

        rows_2 = rows.loc[df['Ålder'] == age]       # All the rows corresponding to one age group within one year
        
        index = rows_2.index.values                 # All the concerned indices
        df.loc[index, 'Värde'] = rows_2['Värde'] / df2[str(year)][age-1]*100000

        # print (df.loc[index].loc[df['Region'] == 0]['Värde'].sum())       # Should sum to 1

df.to_csv('finaldeadvsAlive.csv', sep = ';', index = False)