import csv
import pandas as pd
import numpy as np

df = pd.read_csv('dead2.csv', delimiter = ';')     



print(df[['Region', 'Ålder']])


df.to_csv(r'dead3.csv')

temp_val = 0

for i in range(1, len(df)):
    #a = df.loc[i, 'Region']
    #print (a)
    print ('for loop')
    # while region == previous region
    if (df.loc[i, 'Region'] == df.loc[i-1, 'Region']):
        print ('if 1')
        # while age group == previous age group
        if (df.loc[i, 'Ålder'] == df.loc[i-1, 'Ålder']):
            print ('if 2')

            # sum up values into temp_val
            temp_val += int(df.loc[i, 'Värde'])
            print (temp_val)
            
        
        # When age group != previous age group
        elif (df.loc[i, 'Ålder'] != df.loc[i-1, 'Ålder']):
            print ('if 3')

            # Take the previous row, modify its value to be temp_val
            # write this row to the csv file
            # reset temp_val
            temp_val = int(df.loc[i, "Värde"])
