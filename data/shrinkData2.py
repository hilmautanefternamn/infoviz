import csv

# This file saves only the wanted diagnoses and renames them

with open('dead1.csv', 'r') as f_input, open('dead2.csv', 'w') as f_output:
    csv_output = csv.writer(f_output, delimiter=';')

    data = csv.reader(f_input, delimiter=';')
    csv_output.writerow(next(data))

    for row in data:
        if int(row[5]) in [1, 2, 3]:  # if in age group 1 ineterval
            row[5] = 1
            csv_output.writerow(row)
        elif int(row[5]) in [4, 5]:
            row[5] = 2
            csv_output.writerow(row)
        elif int(row[5]) in [6, 7, 8]:
            row[5] = 3
            csv_output.writerow(row)
        elif int(row[5]) in [9, 10, 11, 12, 13]:
            row[5] = 4
            csv_output.writerow(row)
        elif int(row[5]) in [14, 15, 16, 17, 18, 99]:
            row[5] = 4
            csv_output.writerow(row)
