import sys, os, json, nbformat
from nbclient import NotebookClient
sys.stdout.reconfigure(encoding='utf-8')
for f in sys.argv[1:]:
    nb = nbformat.read(f, as_version=4)
    try:
        NotebookClient(nb, timeout=600, kernel_name='python3', resources={'metadata': {'path': os.path.join(os.path.dirname(os.path.abspath(__file__)), 'nbtest')}}).execute()
        print('OK', f)
    except Exception as e:
        print('FAIL', f, str(e)[-1500:])
    for c in nb.cells:
        if c.cell_type != 'code': continue
        for o in c.get('outputs', []):
            t = o.get('text') or (o.get('data', {}) or {}).get('text/plain', '')
            if t: print('   >', ''.join(t)[:300].replace('\n', ' | '))
