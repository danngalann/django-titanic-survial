from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import pickle, os, json

# Returns a prediction for a given data
@csrf_exempt
def index(request):
  # Load classifier
  CURRENT_DIR = os.path.dirname(__file__)
  modelFile = os.path.join(CURRENT_DIR, "bin", "model.pkl")
  with open(modelFile, 'rb') as model:
    clf = pickle.load(model)
  
  # Parse request to a Python list
  print(request.body)
  jsonData = json.loads(request.body)
  data = [jsonData["Pclass"], jsonData["Sex"], jsonData["Age"], jsonData["SibSp"], jsonData["Parch"]]

  # Make prediction
  res = {"isAlive": int(clf.predict([data])[0])}
  
  # Return response
  return JsonResponse(res, safe=False)