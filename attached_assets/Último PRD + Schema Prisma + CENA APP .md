FLUXO DE PERSISTÊNCIA

1\. ADMIN publica Tema  
   ⇢ POST /api/admin/theme  
      \- upsert Theme  
        • title, description  
        • headerImageUrl  
        • videoUrl  
        • pdfUrls\[ \] (máx 5\)  
      \- Theme.active \= true

2\. VISITANTE vira usuário (Sign-Up)  
   ⇢ Clerk webhook user.created  
      \- create User (clerkId, email, imageUrl)  
      \- create RolePivot(role \= ACTOR)   ← default  
        (Se marcou Tutor/Admin/Guest ➜ cria pivots adicionais)

3\. ATOR escolhe plano  
   ⇢ Stripe Checkout session  
   ⇢ webhook checkout.session.completed  
      \- create Subscription(  
          userId,  
          plan \= BASIC | PLUS | PRO,  
          billingCycle \= MONTHLY/Q/S/A,  
          status \= ACTIVE,  
          stripeSubId)  
      \- update RolePivot(plan)           ← mantém role \= ACTOR

4\. ATOR envia Self-Tapes  
   ⇢ POST /api/theme/submission  
      \- read Subscription.plan p/ limites  
      \- create Submission(  
          themeId,  
          userId,  
          tapeUrls\[ \],  
          feedbackMode \= ASYNC)

5\. ATOR compra Live Upgrade (opcional)  
   ⇢ Stripe Payment  
   ⇢ webhook invoice.paid  
      \- create AddOnPurchase(  
          userId,  
          type \= LIVE\_FEEDBACK\_UPGRADE,  
          targetSubmissionId)  
      \- update Submission.feedbackMode \= LIVE

6\. TUTOR grava ou faz sessão  
   ⇢ POST /api/feedback  
      \- create Feedback(  
          submissionId,  
          tutorId,  
          videoUrl,  
          transcript,  
          mode \= LIVE|ASYNC,  
          liveAt \= date? )  
      \- mark AddOnPurchase.redeemed \= true  (se for LIVE)

7\. ATOR visualiza Feedback  
   ⇢ GET /api/feedback?actorId=X  
      \- lê Feedback \+ Tutor info

8\. ATOR compra Sessão 1:1 (opcional)  
   ⇢ Stripe Payment  
   ⇢ webhook invoice.paid  
      \- create AddOnPurchase(  
          userId,  
          type \= ONE\_ON\_ONE\_SESSION )  
      \- (agendamento Live futuro ficará fora do MVP)

9\. ADMIN altera papéis/planos  
   ⇢ PATCH /api/admin/user/:id  
      \- update RolePivot(role | plan)  
      \- update Subscription (se plano mudar)

