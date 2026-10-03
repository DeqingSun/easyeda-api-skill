import subprocess,json,sys,pathlib
p=pathlib.Path('cli-routing'); name=sys.argv[1]; code=(p/(name+'.js')).read_text()
r=subprocess.run(['/Applications/嘉立创EDA(专业版).app/Contents/MacOS/LCEDA-Pro','invoke','--session','ddcf90c6-0116-49e4-bbc0-d80104291e5f','--ext-uuid','eda','--code',code],capture_output=True,text=True)
(p/(name+'.json')).write_text(r.stdout);x=json.loads(r.stdout);assert x['ok'],x
print(json.dumps(x['value']))
