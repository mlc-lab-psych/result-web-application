export const routes = [
    {path: "/pilot-1",                      cred_file: "pilot_1",           url: "https://pilot-1-c12c1-default-rtdb.firebaseio.com/",          experimentName: "Alive Experiment Pilot 1" },
    {path: "/pilot-1-session-2",            cred_file: "pilot_2",           url: "https://pilot-1-session-2-default-rtdb.firebaseio.com/",      experimentName: "Alive Experiment Pilot 1 Session 2" },
    {path: "/alive-indiv-diff-1",           cred_file: "indiv_diff_1",      url: "https://alive-indiv-session-1-default-rtdb.firebaseio.com/",  experimentName: "Alive Experiment Indiv Diff Pilot Session 1" },
    {path: "/alive-indiv-diff-2",           cred_file: "indiv_diff_2",      url: "https://alive-indiv-session-2-default-rtdb.firebaseio.com/",  experimentName: "Alive Experiment Indiv Diff Pilot Session 2" },
    {path: "/alignment-voice",              cred_file: "alignment_voice",   url: "https://alignment-voice-default-rtdb.firebaseio.com/",        experimentName: "Alignment Voice Experiment",                     audio: true, },
    {path: "/iat-anart",                    cred_file: "iat_anart",         url: "https://iat-categorize-default-rtdb.firebaseio.com/",         experimentName: "IAT Animal Artifact Experiment" },
    {path: "/iat-annat",                    cred_file: "iat_annat",         url: "https://iat-annat-default-rtdb.firebaseio.com/",              experimentName: "IAT Animal Nature Experiment" },
    {path: "/iat-hyuart",                   cred_file: "iat_hyuart",        url: "https://iat-hyuart-default-rtdb.firebaseio.com/",             experimentName: "IAT Human Artifact Experiment" },
    {path: "/iat-anpla",                    cred_file: "iat_anpla",         url: "https://iat-anpla-default-rtdb.firebaseio.com/",              experimentName: "IAT Animal Plant Experiment" },
    {path: "/iat-plaart",                   cred_file: "iat_plaart",        url: "https://iat-plaart-default-rtdb.firebaseio.com/",             experimentName: "IAT Plant Artifact Experiment" },
    {path: "/iat-natveh",                   cred_file: "iat_natveh",        url: "https://iat-natveh-default-rtdb.firebaseio.com/",             experimentName: "IAT Animal Nature Experiment" },
    {path: "/iat-planat",                   cred_file: "iat_planat",        url: "https://iat-planat-default-rtdb.firebaseio.com/",             experimentName: "IAT Plant Nature Experiment" },
    {path: "/iat-natart",                   cred_file: "iat_natart",        url: "https://iat-natart-default-rtdb.firebaseio.com/",             experimentName: "IAT Nature Artifact Experiment" },
    {path: "/iat-plaveh",                   cred_file: "iat_plaveh",        url: "https://iat-plaveh-default-rtdb.firebaseio.com/",             experimentName: "IAT Plant Vehicle Experiment" },
    {path: "/iat-animals",                  cred_file: "iat_animals",       url: "https://iat-animals-default-rtdb.firebaseio.com/",             experimentName: "IAT Animals Experiment" },
    {path: "/iat-humans",                   cred_file: "iat_humans",        url: "https://iat-humans-default-rtdb.firebaseio.com/",             experimentName: "IAT Humans Experiment" },
    {path: "/categorization-order",         cred_file: "categorize",        url: "https://categorization-orders-default-rtdb.firebaseio.com/",  experimentName: "Categorization Order" },
    {path: "/categorization-order-reverse", cred_file: "categorize",        url: "https://categorization-orders-default-rtdb.firebaseio.com/",  experimentName: "Categorization Order Reverse",                   reference:"users-new-reverse"},
    {path: "/alive-indiv-rep-session-1",    cred_file: "indiv_rep",         url: "https://alive-indiv-rep-default-rtdb.firebaseio.com/",        experimentName: "Alive Indiv Rep Session 1",                      reference:"users-new-session-1"},
    {path: "/alive-indiv-rep-session-2",    cred_file: "indiv_rep",         url: "https://alive-indiv-rep-default-rtdb.firebaseio.com/",        experimentName: "Alive Indiv Rep Session 2",                      reference:"users-new-session-2"},
    {path: "/mlc-1048-animals",             cred_file: "mlc_1048",          url: "https://alive-5b7bc-default-rtdb.firebaseio.com/",            experimentName: "MLC 1048 Animals"},
    {path: "/mlc-1049",                     cred_file: "mlc_1048",          url: "https://alive-5b7bc-default-rtdb.firebaseio.com/",            experimentName: "MLC 1049",                                       reference:"mlc1049/results"}
];

//for vercel