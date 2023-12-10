(impl-trait .proposal-trait.proposal-trait)

(define-public (execute (sender principal))
  (begin
    ;; Mint initial token supply.
      (try! (contract-call? .membership-token mint
        {amount: u9001, recipient: sender})
      (try! (contract-call? .membership-token mint
        {amount: u9001, recipient: 'SP380ANQR0PHRGXQWHN7CYMKC8KSJS2MDBZA4EE7S})
      )
      (print "DAO bootstrapped")
      (ok true)
  )
)