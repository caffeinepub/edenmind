import List "mo:core/List";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

actor {
  type PlantInfo = {
    name : Text;
    type_ : Text;
    environment : Text;
    wateringHabits : Text;
    symptoms : [Text];
  };

  type Diagnosis = {
    issue : Text;
    treatment : Text;
    careRecommendations : Text;
  };

  let plantDiagnoses = Map.empty<Principal, Diagnosis>();

  func analyzeSymptoms(plantInfo : PlantInfo) : Diagnosis {
    if (plantInfo.symptoms.size() == 0) {
      Runtime.trap("No symptoms provided.");
    };

    let commonSymptoms = List.empty<(Text, Text)>();
    commonSymptoms.add(("wilting", "overwatering"));
    commonSymptoms.add(("yellowing", "nutrient deficiency"));
    commonSymptoms.add(("spots", "fungal infection"));

    let matchedSymptoms = List.empty<Text>();
    for (symptom in plantInfo.symptoms.values()) {
      for (mapping in commonSymptoms.values()) {
        if (symptom.contains(#text(mapping.0))) {
          matchedSymptoms.add(mapping.1);
        };
      };
    };

    if (matchedSymptoms.isEmpty()) {
      Runtime.trap("No specific diagnosis found for the provided symptoms.");
    };

    let primaryIssue = matchedSymptoms.first();
    let treatment = switch (primaryIssue) {
      case (?issue) {
        switch (issue) {
          case ("overwatering") { "Reduce watering and improve drainage" };
          case ("nutrient deficiency") { "Add balanced fertilizer and check soil pH" };
          case ("fungal infection") { "Apply a suitable fungicide and remove affected leaves" };
          case (other) { other };
        };
      };
      case (null) { "No specific treatment found" };
    };

    let careRecommendations = "Continue monitoring plant health, provide proper lighting and watering, and maintain regular feeding schedule.";

    {
      issue = switch (primaryIssue) {
        case (null) { "Unknown" };
        case (?i) { i };
      };
      treatment;
      careRecommendations;
    };
  };

  public shared ({ caller }) func submitPlantInfo(plantInfo : PlantInfo) : async Diagnosis {
    let diagnosis = analyzeSymptoms(plantInfo);
    plantDiagnoses.add(caller, diagnosis);
    diagnosis;
  };

  public query ({ caller }) func getDiagnosis() : async Diagnosis {
    switch (plantDiagnoses.get(caller)) {
      case (null) { Runtime.trap("No diagnosis found for this user.") };
      case (?diagnosis) { diagnosis };
    };
  };

  public query ({ caller }) func getAllDiagnoses() : async [Diagnosis] {
    plantDiagnoses.values().toArray();
  };

  public query ({ caller }) func searchDiagnosesByIssue(issue : Text) : async [Diagnosis] {
    plantDiagnoses.values().toArray().filter(
      func(diagnosis) { diagnosis.issue.contains(#text(issue)) }
    );
  };
};
