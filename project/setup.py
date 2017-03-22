from setuptools import setup

setup(
    name ='softEngAssignment4',
    version = '0.1',
    description = 'Program to display availability of dublin bikes based on historical data',
    url = 'https://github.com/minogud2/softEngAssignment4',
    author = 'Cara Delorey, Darragh Minogue, Tao Li',
    author_emails = 'darragh.minogue@ucdconnect.ie, cara.delorey@ucdconnect.ie',
    license='MIT',
    install_requires = 'requirements.txt',
    packages=['src'],
    entry_points={
        'console_scripts': ['softEngAssignment4 = src.main:main']
        }
    )