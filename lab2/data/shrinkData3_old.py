import csv

# This file saves only the wanted diagnoses and renames them

with open('dead2.csv', 'r') as f_input, open('dead3.csv', 'w') as f_output:
    csv_output = csv.writer(f_output, delimiter=';')

    data = csv.reader(f_input, delimiter=';')
    csv_output.writerow(next(data))


    temp = 0
    temp_val = 0
    temp_val_2 = 0

    for row in data:

        if row[5] == temp:
            print ('it is same age group')
            # increase temp value
            temp_val += int(row[6])
            print (row[6])
            print (temp_val)

        if row[5] != temp:
            print ('it is NOT same age group')
            
            # store row[6] temp_val_2
            temp_val_2 = row[6]
            # set row[6] to temp_val
            row[6] = temp_val
            # print row to csv file
            csv_output.writerow(row)
            # set row[6] to temp_val_2
            row[6] = temp_val_2
            
            temp_val = int(row[6])
            print (temp_val)


        temp = row[5];




            


