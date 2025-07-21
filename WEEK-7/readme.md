# ModelVista

**An Interactive ML Model Deployment Platform**  
*Celebal Internship Assignment Submission – July 2025*

---

## 🚀 Overview

**ModelVista** is a next-generation Streamlit application crafted for hands-on machine learning model deployment, data insight, and interpretation. Specifically built for my internship objective, it enables users to:

- Explore and visualize a variety of real-world datasets
- Train, tune, and evaluate diverse machine learning models
- Perform predictions (single or batch) directly and interactively in the browser
- Understand model outcomes with confidence visuals, feature rankings, and clear explanations

---

## 📝 Assignment Statement

> **Deploying Machine Learning Models with Streamlit**  
> Develop a web application using Streamlit to deploy a trained machine learning model. The app should allow users to input data, receive predictions, and understand model outputs through visualizations. This task will help you learn how to make your models accessible and interactive.

---

## 🏆 Features

- **Multi-Page Design:** Effortlessly navigate through Home, Data Explorer, Playground, Predict, and About sections.
- **Intuitive User Interface:** Clean, adaptable layouts supporting rich charts and stepwise workflow.
- **Interactive Data Exploration:** Preview datasets, analyze statistics, and visualize feature distributions.
- **Model Playground:** Choose among popular algorithms, tune parameters, and get instant performance metrics (accuracy, F1-score, confusion matrix, feature importances).
- **Live & Batch Prediction:** Enter inputs or upload CSVs for predictions; results are explained and visualized.
- **Explainable Results:** Visual and plain-language model interpretations for all predictions.
- **Easy Customization:** Seamlessly add new datasets or ML models for future expansion.

---

## 🚦 How It Works

### 1. Home

Landing page offering project context, navigation guide, and assignment goals.

**Screenshot:**  
<img width="1430" height="530" alt="image" src="https://github.com/user-attachments/assets/d13a8a8d-e139-43f3-a1bb-ea327ca43715" />


---

### 2. Data Explorer

Choose datasets to preview data samples, view statistics, visualize numeric features, and list columns.

**Screenshot:**  
<img width="1427" height="887" alt="image" src="https://github.com/user-attachments/assets/efd658ee-063e-49e1-abcf-1e3e5f7e169d" />


---

### 3. Model Playground

Select a dataset, algorithm, and hyperparameters. Instantly train and evaluate the model, seeing live metrics, confusion matrix, and key feature rankings.

**Screenshot:**  
<img width="1170" height="887" alt="image" src="https://github.com/user-attachments/assets/95d30032-c308-4dcf-b3d5-1bc70176e528" />


---

### 4. Predict

Input data for a prediction or upload a batch of examples. Receive immediate results complete with confidence scores and what drove the prediction.

**Screenshot:**  
<img width="1177" height="634" alt="image" src="https://github.com/user-attachments/assets/904a222d-92a9-4f3e-9c3e-9523aecac88c" />

<img width="1161" height="801" alt="image" src="https://github.com/user-attachments/assets/1d4afc95-6605-4a2d-8c02-9cf04020c1bd" />

---


---

### 5. About

Project details, assignment statement, credits, and contact.

**Screenshot:**  
<img width="1176" height="269" alt="image" src="https://github.com/user-attachments/assets/6bf5d6eb-287c-474e-a825-af542e7cfa78" />


---

## 🛠️ Technologies Used

- **Streamlit:** Rapid app development & deployment
- **Pandas:** Data analysis and manipulation
- **Scikit-learn:** ML algorithms, training, and validation
- **Matplotlib & Seaborn:** Visual analytics and plotting
- **Python 3.10+**

---

## 🚀 Getting Started

1. **Clone the repository**
    ```
    git clone https://github.com/yourusername/ModelVista.git
    cd ModelVista
    ```
2. **Install dependencies**
    ```
    pip install -r requirements.txt
    ```
3. **Run the app**
    ```
    streamlit run streamlit_app.py
    ```
4. **Open the suggested local URL and interact with the app!**

---

## 💡 Customization

- **Add new datasets:** Place your CSV inside the `Dataset/` folder and update paths in the main code.
- **Refresh the theme:** Adjust appearance using `.streamlit/config.toml` (colors, branding, font).
- **Expand model options:** Add/expose new ML algorithms in `streamlit_app.py` as needed.

---

## 🧠 Supervised Machine Learning Algorithms

ModelVista leverages several foundational supervised learning algorithms, each tailored to solve problems where the "correct answer" is already known for training data:

- **K-Nearest Neighbors (KNN):**  
  Predicts the class of a new data point by looking at the closest data points (neighbors) in the training set.

- **Support Vector Machines (SVM):**  
  Finds the optimal boundary (hyperplane) that separates classes with the greatest possible margin.

- **Naive Bayes Classifiers:**  
  A family of probabilistic algorithms based on Bayes’ Theorem, assuming feature independence, often used for text and categorical classification.

- **Decision Tree:**  
  Constructs a tree structure that asks a series


---

## 📚 Datasets

Multiple datasets support a wide range of demonstrations, including but not limited to:

- **Iris:**  
  A frequently-used multivariate dataset for classification, with three flower species.

- **Breast Cancer:**  
  Classification of tumors (benign or malignant) based on medical measurements.

- **Wine:**  
  Used to classify wine types from 13 chemical features.

- **Digits:**  
  Image-based classification task, recognizing handwritten digits (0-9).

- **Diabetes:**  
  Regression dataset for predicting disease progression using 10 medical indicators.

- **Naive Bayes Classification Data:**  
  Sourced from [Kaggle: Naive Bayes Classification Data](https://www.kaggle.com/datasets/himanshunakrani/naive-bayes-classification-data), focused on diabetes prediction.

- **Cars Evaluation:**  
  Information-rich dataset (from [Kaggle](https://www.kaggle.com/datasets/elikplim/car-evaluation-data-set)) for classifying car acceptability using categorical features.

- **Salary:**  
  Linear regression problem: years of experience mapped to salary levels, from [Kaggle](https://www.kaggle.com/datasets/abhishek14398/salary-dataset-simple-linear-regression).

- **Heart Disease:**  
  Classification of patient heart health status, using 16 clinical variables ([Kaggle](https://www.kaggle.com/datasets/rashikrahmanpritom/heart-attack-analysis-prediction-dataset)).

- **Titanic:**  
  Predicting passenger survival on the Titanic, a classic benchmark dataset ([Kaggle](https://www.kaggle.com/datasets/vinicius150987/titanic3/data)).

*Each dataset is described and attributed inside the app, and preprocessing steps are handled as needed.*

---

## 📦 Libraries Overview

| Library           | Usage                                                   |
|-------------------|--------------------------------------------------------|
| **NumPy**         | Fast numerical operations on arrays/matrices            |
| **Pandas**        | Data loading, manipulation, cleanup                     |
| **Matplotlib**    | Foundational plotting and charting                      |
| **Seaborn**       | Enhanced data visualization (analytics, trends, stats)  |
| **Scikit-learn**  | Machine learning algorithms, evaluation, preprocessing  |
| **Streamlit**     | User interface, deployment, and interaction             |


---

**Thank you for exploring ModelVista!  
This app demonstrates hands-on, visual, and accessible machine learning for real-world assignments.**

*Don’t forget to replace the screenshot placeholders above with actual image URLs once your project is running for a richer GitHub presentation.*
