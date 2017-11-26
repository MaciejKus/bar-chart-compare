#this file generates links to all the examples
import os
import shutil
import fileinput

distDir = './examples'
srcDir = './src'

#get directories only
libraries = [d for d in os.listdir(srcDir) if os.path.isdir(os.path.join(srcDir, d))]

#update README.md

readmeInfo = '''Inspired by [TodoMVC](http://todomvc.com/) and [hello-world](https://github.com/leachim6/hello-world), this project is meant to showcase and compare JavaScript charting libraries. 

Each library is used to create a simple bar graph. Bar graphs are one of the most clear, useful and popular types of graphs. They are also simple enough that every charting library will allow you to create one.

There are a few requirements/suggestions for the bar graphs that are created. These should be implemented using the library, if possible:

  * Load data and configuration options from data.json.
  * Render a vertical bar graph (sometimes called ca column graph).
  * Use the colors specified in data.json, including creating a border around each bar.
  * Have a tooltip when a user hovers over each bar.
  * Have a graph title along with axis labels and titles.

'''

for lib in libraries:
  readmeInfo += '\n* [%s](%s/%s/)' %( lib, distDir,lib)

readme = open('./README.md', 'w')
readme.write(readmeInfo)
readme.close()

#add navigation links in files

#move everuything over to ./examples 
if os.path.exists(distDir):
  shutil.rmtree(distDir)
shutil.copytree(srcDir, distDir)

links = '<h3>Charting libraries:<h3>'
for lib in libraries:
  links += '<br><a href="../%s">%s</a>' % (lib, lib)

#inset links into index.html files
for lib in libraries:
  filePath = distDir + '/' + lib + '/index.html'
  for line in fileinput.input(filePath, inplace=1):
    if '</body>' in line:
      line = line.replace(line, links + line)
    print line,


indexInfo = '''A JavaScript charting library comparison. See <a href="https://github.com/MaciejKus/bar-chart-compare">https://github.com/MaciejKus/bar-chart-compare</a> for source/more info.

<p>
'''

indexInfo += links

index = open('./index.html', 'w')
index.write(indexInfo)
index.close()
