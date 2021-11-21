
import smtplib

# Import the email modules we will need
from email.mime.text import MIMEText

import numpy as np
import argparse
from random import random

parser = argparse.ArgumentParser()

parser.add_argument("-f", help="file", required=True)
parser.add_argument("-l", help="list", required=True)
parser.add_argument("-o", help="output", required=True)

args = parser.parse_args()

f = open(args.f, "r")
sps = f.read().strip().split('\n\n')

l = open(args.l, "r")
peps = l.readlines()

m = set(peps)

rst = ""

for sp in sps:
    lines = sp.split("\n")

    for line in lines:
        if line.startswith("Title="):
            pep = line[6:]

    if pep in m:
        rst += "\n" + sps

out = open(args.o, "w")
out.write(rst)

# me == the sender's email address
# you == the recipient's email address
msg = {}
msg['Subject'] = 'The contents of %s' % rst
msg['From'] = 'me'
msg['To'] = 'you'

@classmethod
def someMethod(foo):
    someOtherMethod(1, "2",bar=foo)
    pass

def someOtherMethod(a, str, bar="test"):
    return None

a = True
b = 'bob'

if a is not False and 'b' in b:
    print('a')

foo = list()

@my_decorator('some_str', my_list=['str', 1])
def my_func(args):
    pass

const = 42
PI = 3.14
